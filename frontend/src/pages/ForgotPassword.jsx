import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.forgotPassword({ email });
      toast.success(response.data.message);
      setEmail('');
      // Optional: You can show a message or redirect
      // After 2 seconds, go back to login
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding min-h-screen bg-white">
      <div className="container-custom max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em] mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            Enter your email address and we'll send you a password reset link.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-xs text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="underline hover:text-black font-semibold">
                  Back to Login
                </Link>
              </p>
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="underline hover:text-black font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ForgotPassword;
