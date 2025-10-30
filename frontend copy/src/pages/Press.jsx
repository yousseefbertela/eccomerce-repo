import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';

const Press = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Press & Media"
        subtitle="Latest news and media resources"
        breadcrumbs={[{ label: 'Press' }]}
        backgroundImage="/assets/images/background1.jpeg"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
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

export default Press;