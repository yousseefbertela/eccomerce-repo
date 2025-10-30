const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const legalPages = {
  'Press.jsx': `import { motion } from 'framer-motion';

const Press = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-['Archivo'] font-bold uppercase mb-8"
        >
          Press & Media
        </motion.h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-gray-700 mb-4">
              For press inquiries, interviews, or media requests, please contact our PR team:
            </p>
            <p className="text-lg font-semibold">press@angal.com</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Press Kit</h2>
            <p className="text-gray-700 mb-4">
              Download our media kit including brand assets, product images, and company information.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
              Download Press Kit
            </button>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Recent Coverage</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Fashion Weekly - October 2025</h3>
                <p className="text-gray-600">"ANGAL redefines contemporary streetwear with sustainable practices"</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Style Magazine - September 2025</h3>
                <p className="text-gray-600">"The brand making waves in urban fashion"</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Press;`,

  'Privacy.jsx': `import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-['Archivo'] font-bold uppercase mb-8"
        >
          Privacy Policy
        </motion.h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
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

export default Privacy;`,

  'Terms.jsx': `import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-['Archivo'] font-bold uppercase mb-8"
        >
          Terms of Service
        </motion.h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
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

export default Terms;`,

  'Cookies.jsx': `import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-['Archivo'] font-bold uppercase mb-8"
        >
          Cookie Policy
        </motion.h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: October 18, 2025</p>

          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our
              website. They help us provide you with a better experience by remembering your
              preferences and analyzing how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable
                  core functionality such as security, network management, and accessibility.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                <p>
                  These cookies enable enhanced functionality and personalization, such as
                  remembering your cart items and language preferences.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by
                  collecting and reporting information anonymously.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Marketing Cookies</h3>
                <p>
                  These cookies are used to track visitors across websites and display relevant
                  advertisements. They may be set by us or third-party providers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies in your browser settings. Please note that
              removing or blocking cookies may impact your user experience and some features
              may not function properly.
            </p>
            <p className="mt-4">Most browsers allow you to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>See what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
            <p>
              We may use third-party services such as Google Analytics, social media platforms,
              and advertising networks. These services may set their own cookies to provide their
              functionality. We do not control these cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We encourage you to review
              this page periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:
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

export default Cookies;`,
};

// Write all legal pages
Object.entries(legalPages).forEach(([filename, content]) => {
  const filepath = path.join(pagesDir, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ Created ${filename}`);
});

console.log(`\n🎉 Generated ${Object.keys(legalPages).length} legal pages!`);
console.log('\n✅ ALL PAGES COMPLETE!');
