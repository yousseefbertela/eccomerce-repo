import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Cookie Policy"
        subtitle="How we use cookies to improve your experience"
        breadcrumbs={[{ label: 'Cookie Policy' }]}
        backgroundImage="/assets/images/bckground 6.webp"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
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

export default Cookies;