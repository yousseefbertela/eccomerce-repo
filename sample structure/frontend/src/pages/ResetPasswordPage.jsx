import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../lib/axios.js';
import Logo from '../components/Logo.jsx';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast.error('Invalid reset link');
      navigate('/auth');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword: formData.newPassword,
      });
      
      toast.success(response.data?.message || 'Password reset successful');
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (error) {
      toast.error(error?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.newPassword && formData.confirmPassword && !loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-16">
        <div className="w-full rounded-3xl border border-base-200/60 bg-base-100/80 p-8 shadow-2xl backdrop-blur">
          <Logo />
          <div className="mt-8 space-y-4">
            <h1 className="text-2xl font-bold text-base-content">Set New Password</h1>
            <p className="text-base-content/70">
              Enter your new password below. Make sure it's secure and memorable.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="newPassword">
                <span className="label-text font-medium">New Password</span>
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter new password"
                required
                disabled={loading}
                minLength={6}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Minimum 6 characters
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text font-medium">Confirm New Password</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Confirm new password"
                required
                disabled={loading}
              />
              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Passwords do not match
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/auth" 
              className="link link-primary text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;