import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const initialErrors = {
  name: '',
  email: '',
  password: '',
};

// Client-side validation functions
const validateName = (name) => {
  if (!name || name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name cannot exceed 50 characters';
  }
  // Check if name contains only letters and spaces (all languages)
  if (!/^[\p{L}\s]{2,50}$/u.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  return '';
};

const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  if (email.length > 254) {
    return 'Email cannot exceed 254 characters';
  }
  return '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 128) {
    return 'Password cannot exceed 128 characters';
  }
  // Check if password contains at least one letter and one number
  if (!/(?=.*\p{L})(?=.*\d)/u.test(password)) {
    return 'Password must contain at least one letter and one number';
  }
  return '';
};

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const { login, register, user, initializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initializing && user) {
      navigate('/', { replace: true });
    }
  }, [user, initializing, navigate]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setForm(initialState);
    setErrors(initialErrors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (mode === 'register') {
      const nameError = validateName(form.name);
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }
    }

    const emailError = validateEmail(form.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Client-side validation
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await login({ email: form.email, password: form.password });
        toast.success(response?.message || 'Welcome back!');
        navigate('/', { replace: true });
      } else {
        const response = await register(form);
        toast.success(response?.message || 'Account created. Await approval.');
        setMode('login');
        setForm(initialState);
        setErrors(initialErrors);
      }
    } catch (error) {
      // Handle server validation errors
      if (error?.errors && Array.isArray(error.errors)) {
        const serverErrors = { ...initialErrors };
        error.errors.forEach((err) => {
          if (serverErrors.hasOwnProperty(err.field)) {
            serverErrors[err.field] = err.message;
          }
        });
        setErrors(serverErrors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error(error?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-16">
        <div className="relative w-full overflow-hidden rounded-3xl border border-base-200/60 bg-base-100/80 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            <section className="p-8 sm:p-12">
              <Logo />
              <div className="mt-8 space-y-4">
                <h1 className="text-3xl font-bold text-base-content">
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="text-base-content/70">
                  {mode === 'login'
                    ? 'Sign in to manage files, approvals, and keep the team aligned.'
                    : 'Request access to Angal. The boss will review and approve your access shortly.'}
                </p>
              </div>
              <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div className="form-control">
                    <label className="label" htmlFor="name">
                      <span className="label-text">Full name</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.name}</span>
                      </label>
                    )}
                  </div>
                )}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Work email</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email}</span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.password}</span>
                    </label>
                  )}
                  {mode === 'register' && !errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        At least 6 characters with letter and number
                      </span>
                    </label>
                  )}
                </div>
                <button type="submit" className="btn btn-primary btn-block gap-2" disabled={loading}>
                  {loading ? <span className="loading loading-spinner" /> : null}
                  <span>{mode === 'login' ? 'Sign in' : 'Request access'}</span>
                </button>
              </form>
              <div className="mt-6 space-y-3">
                {mode === 'login' && (
                  <div className="text-center">
                    <Link to="/forgot-password" className="link link-primary text-sm">
                      Forgot your password?
                    </Link>
                  </div>
                )}
                <div className="text-sm text-base-content/60">
                  {mode === 'login' ? "Don't have an account yet?" : 'Already have an account?'}{' '}
                  <button type="button" className="link" onClick={toggleMode}>
                    {mode === 'login' ? 'Request access' : 'Sign in'}
                  </button>
                </div>
              </div>
            </section>
            <aside className="hidden flex-col justify-between bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-12 text-primary-content lg:flex">
              <div>
                <h2 className="text-3xl font-bold">Angal Aziz System</h2>
                <p className="mt-4 max-w-sm text-primary-content/80">
                  Centralize approvals, file sharing, and secure collaboration in one place. Bosses stay in control,
                  staff stay empowered.
                </p>
              </div>
              <div className="space-y-4 text-primary-content/70">
                <p>✨ Track every access request effortlessly.</p>
                <p>🔐 Fine-grained permissions keep files safe.</p>
                <p>⚡ Real-time notifications keep everyone aligned.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
