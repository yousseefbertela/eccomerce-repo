import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authAPI } from '../lib/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Register = () => {
	const { register, login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [form, setForm] = useState({ email: '', password: '', name: '' });
	const [error, setError] = useState('');
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
	const [verifying, setVerifying] = useState(false);

	// Redirect if already logged in
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/', { replace: true });
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		console.log('Attempting registration with:', form);
		const res = await register(form);
		console.log('Registration result:', res);
		setLoading(false);
		if (res.success) {
			// Show verification code entry form
			setRegistrationSuccess(true);
		} else {
			setError(res.error);
		}
	};

	const handleCodeChange = (index, value) => {
		// Only allow numbers
		if (value && !/^\d$/.test(value)) return;

		const newCode = [...verificationCode];
		newCode[index] = value;
		setVerificationCode(newCode);

		// Auto-focus next input
		if (value && index < 5) {
			const nextInput = document.getElementById(`code-${index + 1}`);
			if (nextInput) nextInput.focus();
		}
	};

	const handleCodeKeyDown = (index, e) => {
		// Handle backspace
		if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
			const prevInput = document.getElementById(`code-${index - 1}`);
			if (prevInput) prevInput.focus();
		}
	};

	const handleVerifyCode = async (e) => {
		e.preventDefault();
		const code = verificationCode.join('');
		
		if (code.length !== 6) {
			toast.error('Please enter all 6 digits');
			return;
		}

		setVerifying(true);
		try {
			const response = await authAPI.verifyEmail(form.email, code);
			toast.success('Email verified successfully!');
			
			// Auto-login after verification
			if (response.data.token) {
				localStorage.setItem('token', JSON.stringify(response.data.token));
				localStorage.setItem('user', JSON.stringify(response.data.user));
				
				// Navigate to the return URL or home
				const from = location.state?.from?.pathname || '/';
				navigate(from, { replace: true });
				window.location.reload(); // Reload to update auth context
			}
		} catch (err) {
			toast.error(err.response?.data?.message || 'Invalid or expired code');
		} finally {
			setVerifying(false);
		}
	};

	const handleResendCode = async () => {
		try {
			await authAPI.resendVerification({ email: form.email });
			toast.success('New code sent to your email');
			setVerificationCode(['', '', '', '', '', '']);
		} catch (err) {
			toast.error(err.response?.data?.message || 'Failed to resend code');
		}
	};

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-md mx-auto">
				<h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em] mb-8">Register</h1>
				
				{!registrationSuccess ? (
					<>
						<form className="space-y-6" onSubmit={handleSubmit}>
							<Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
							<Input label="Email" name="email" value={form.email} onChange={handleChange} required type="email" />
							<Input label="Password" name="password" value={form.password} onChange={handleChange} required type="password" minLength="6" />
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? 'Registering...' : 'Register'}
							</Button>
						</form>
						<div className="mt-6 text-center">
							<span className="text-xs text-gray-600">Already have an account?</span>
							<Link to="/login" className="ml-2 text-xs text-black underline hover:no-underline">
								Login
							</Link>
						</div>
					</>
				) : (
					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
						<p className="text-gray-600 mb-6">
							We've sent a 6-digit code to <strong>{form.email}</strong>
						</p>
						
						<form onSubmit={handleVerifyCode} className="mb-6">
							<div className="flex justify-center gap-2 mb-6">
								{verificationCode.map((digit, index) => (
									<input
										key={index}
										id={`code-${index}`}
										type="text"
										maxLength="1"
										value={digit}
										onChange={(e) => handleCodeChange(index, e.target.value)}
										onKeyDown={(e) => handleCodeKeyDown(index, e)}
										className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded focus:border-black focus:outline-none"
										autoFocus={index === 0}
									/>
								))}
							</div>
							
							<Button type="submit" className="w-full mb-4" disabled={verifying}>
								{verifying ? 'Verifying...' : 'Verify Email'}
							</Button>
						</form>

						<p className="text-sm text-gray-500 mb-2">
							Didn't receive the code?
						</p>
						<button
							onClick={handleResendCode}
							className="text-sm text-black underline hover:no-underline"
						>
							Resend Code
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Register;
