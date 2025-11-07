import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [form, setForm] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [requiresVerification, setRequiresVerification] = useState(false);
	const [loading, setLoading] = useState(false);

	// Redirect if already logged in
	useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		}
	}, [isAuthenticated, navigate, location]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setRequiresVerification(false);
		const res = await login(form.email, form.password);
		setLoading(false);
		if (res.success) {
			// Redirect to the page they tried to visit or home
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		} else {
			setError(res.error);
			// Check if user needs to verify email
			if (res.requiresVerification) {
				setRequiresVerification(true);
			}
		}
	};

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-md mx-auto">
				<h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em] mb-8">Login</h1>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<Input label="Email" name="email" value={form.email} onChange={handleChange} required type="email" />
				<Input label="Password" name="password" value={form.password} onChange={handleChange} required type="password" />
				
				{error && (
					<div className="bg-red-50 border border-red-200 rounded p-3">
						<p className="text-red-600 text-sm">{error}</p>
						{requiresVerification && (
							<p className="text-xs text-red-700 mt-2">
								Please verify your email first. Check your inbox for the verification code or{' '}
								<Link to="/register" className="underline hover:no-underline">
									register again
								</Link> to receive a new code.
							</p>
						)}
					</div>
				)}

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'Logging in...' : 'Login'}
				</Button>

				<div className="text-center">
					<Link to="/forgot-password" className="text-xs text-gray-600 hover:text-black underline">
						Forgot Password?
					</Link>
				</div>
			</form>
				<div className="mt-6 text-center">
					<span className="text-xs text-gray-600">Don't have an account?</span>
					<Link to="/register" className="ml-2 text-xs text-black underline hover:no-underline">
						Register
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
