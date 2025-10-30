import { useState } from 'react';
import { X } from 'lucide-react';

const NewsletterModal = ({ open, onClose, onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email || !agree) {
      setError('Please fill all fields and agree to the policy.');
      return;
    }
    setError('');
    if (window && window.toast) {
      window.toast('Thank you! You subscribed to our newsletter.', { icon: '👏', duration: 3500 });
    }
    onSuccess();
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-end pointer-events-none">
      <div className="bg-black text-white rounded-lg shadow-2xl w-full max-w-md p-8 relative animate-fadeIn pointer-events-auto mr-2">
        <button
          className="absolute top-4 right-4 text-white hover:text-neutral"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl md:text-3xl font-archivo font-bold mb-4 text-center">Welcome to Angal</h2>
        <p className="mb-8 text-center text-lg font-light">Subscribe to our newsletter and we'll keep you updated.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-gray-300 focus:outline-none focus:border-neutral text-base"
          />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-gray-300 focus:outline-none focus:border-neutral text-base"
          />
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded mt-2 hover:bg-neutral hover:text-white transition-colors text-lg"
          >
            Join
          </button>
          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className="w-5 h-5 border border-white bg-transparent rounded focus:outline-none focus:ring-0"
              id="newsletter-agree"
            />
            <label htmlFor="newsletter-agree" className="text-sm font-light leading-tight">
              By signing up, I agree to Angal's Privacy Policy and to receive newsletter emails.
            </label>
          </div>
          {error && <div className="text-red-400 text-sm mt-2 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;
