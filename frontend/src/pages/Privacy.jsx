import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Privacy Policy"
        subtitle="How we protect and use your information"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        backgroundImage="/assets/images/backround 4.webp"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-sm text-gray-500">Last updated: October 18, 2025</p>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account,
              make a purchase, sign up for our newsletter, or communicate with us. This includes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely by our payment processor)</li>
              <li>Order history and preferences</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information. However, no method of transmission over the Internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience.
              See our <a href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</a> for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@angal.com" className="text-blue-600 hover:underline">
                privacy@angal.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;