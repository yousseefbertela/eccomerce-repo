import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../lib/axios.js';
import { sendPasswordResetEmail } from '../lib/emailjs.js';
import Logo from '../components/Logo.jsx';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log('📧 Starting password reset for:', email);
      
      // Step 1: Get real reset token from backend
      console.log('🔑 Requesting password reset token from backend...');
      const response = await api.post('/auth/forgot-password-token', { email });
      
      const { resetToken, userName } = response.data;
      console.log('✅ Reset token received from backend:', resetToken.substring(0, 10) + '...');
      
      // Step 2: Send email using EmailJS with real token
      console.log('📧 Sending email via EmailJS...');
      const emailSent = await sendPasswordResetEmail(email, userName, resetToken);
      
      if (emailSent) {
        toast.success('Password reset email sent successfully!');
        setSubmitted(true);
      } else {
        toast.error('Failed to send email. Please check console for details.');
      }
    } catch (error) {
      console.error('❌ Password reset error:', error);
      if (error.response?.status === 429) {
        toast.error('Please wait a few minutes before requesting another password reset');
      } else if (error.response?.status === 404) {
        toast.error('No account found with this email address');
      } else {
        toast.error('Something went wrong: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
        <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-16">
          <div className="w-full rounded-3xl border border-base-200/60 bg-base-100/80 p-8 shadow-2xl backdrop-blur">
            <Logo />
            <div className="mt-8 text-center">
              <div className="mb-6 text-6xl">📧</div>
              <h1 className="text-2xl font-bold text-base-content">Check Your Email</h1>
              <p className="mt-4 text-base-content/70">
                We've sent a password reset link to your email address. Click the link in the email to reset your password.
              </p>
              <p className="mt-4 text-sm text-base-content/60">
                The link will expire in 30 minutes. If you don't receive the email, check your spam folder.
              </p>
              <div className="mt-8">
                <Link 
                  to="/auth" 
                  className="btn btn-primary btn-wide"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-16">
        <div className="w-full rounded-3xl border border-base-200/60 bg-base-100/80 p-8 shadow-2xl backdrop-blur">
          <Logo />
          <div className="mt-8 space-y-4">
            <h1 className="text-2xl font-bold text-base-content">Reset Password</h1>
            <p className="text-base-content/70">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your email address"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/auth" 
              className="link link-primary text-sm"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;