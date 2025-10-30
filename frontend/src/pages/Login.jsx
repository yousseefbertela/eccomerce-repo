import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
	const { login } = useAuth();
	const [form, setForm] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		const res = await login(form.email, form.password);
		setLoading(false);
		if (!res.success) setError(res.error);
	};

	return (
		<section className="section-padding min-h-screen bg-white">
			<div className="container-custom max-w-md mx-auto">
				<h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em] mb-8">Login</h1>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<Input label="Email" name="email" value={form.email} onChange={handleChange} required type="email" />
					<Input label="Password" name="password" value={form.password} onChange={handleChange} required type="password" />
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
				</form>
				<div className="mt-6 text-center">
					<span className="text-xs text-gray-600">Don't have an account?</span>
					<Button as="a" href="/register" variant="secondary" className="ml-2">Register</Button>
				</div>
			</div>
		</section>
	);
};

export default Login;
