import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Terms of Service"
        subtitle="Please read these terms carefully"
        breadcrumbs={[{ label: 'Terms of Service' }]}
        backgroundImage="/assets/images/background 5.webp"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-sm text-gray-500">Last updated: October 18, 2025</p>

          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the
              terms and provisions of this agreement. If you do not agree to these terms,
              please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Infringe on the rights of others</li>
              <li>Restrict or inhibit anyone's use of the website</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit harmful or offensive content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Orders and Payments</h2>
            <p>
              All orders are subject to acceptance and availability. We reserve the right to
              refuse or cancel any order. Prices are subject to change without notice. Payment
              must be received before order processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software,
              is the property of ANGAL and protected by copyright and intellectual property laws.
              You may not reproduce, distribute, or create derivative works without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p>
              ANGAL shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of the website or products purchased
              through the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Returns and Refunds</h2>
            <p>
              Please refer to our <a href="/shipping-returns" className="text-blue-600 hover:underline">
              Shipping & Returns Policy</a> for information about returns and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to the website. Your continued use constitutes acceptance
              of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at:
              <br />
              <a href="mailto:legal@angal.com" className="text-blue-600 hover:underline">
                legal@angal.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;