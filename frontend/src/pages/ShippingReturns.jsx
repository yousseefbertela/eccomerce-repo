import { motion } from 'framer-motion';
import { Package, RotateCcw, Truck, Globe } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Shipping & Returns"
        subtitle="Fast delivery. Easy returns. Worldwide."
        breadcrumbs={[{ label: 'Shipping & Returns' }]}
        backgroundImage="/assets/images/background1.jpeg"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

        {/* Shipping Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8" />
            <h2 className="text-3xl font-bold uppercase">Shipping Information</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Standard Shipping
              </h3>
              <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 3-5 business days</p>
              <p className="text-gray-700 mb-2"><strong>Cost:</strong> Free on orders over $100, otherwise $9.99</p>
              <p className="text-gray-600">
                Standard shipping is available for all domestic orders. Tracking information will be provided once your order ships.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                International Shipping
              </h3>
              <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 7-14 business days</p>
              <p className="text-gray-700 mb-2"><strong>Cost:</strong> Calculated at checkout</p>
              <p className="text-gray-600">
                We ship worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Order Processing</h3>
              <p className="text-gray-600">
                Orders are processed Monday through Friday, excluding holidays. Orders placed on weekends or holidays will be processed the next business day. You will receive an email confirmation once your order ships.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8" />
            <h2 className="text-3xl font-bold uppercase">Return Policy</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">30-Day Returns</h3>
              <p className="text-gray-600 mb-4">
                We offer free returns within 30 days of delivery. Items must be:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Unworn and unwashed</li>
                <li>In original condition with all tags attached</li>
                <li>In original packaging when possible</li>
                <li>Accompanied by original receipt or order confirmation</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">How to Return</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
                <li>Log into your account and navigate to Orders</li>
                <li>Select the item(s) you wish to return</li>
                <li>Follow the prompts to generate a return label</li>
                <li>Package your item(s) securely</li>
                <li>Drop off at any authorized carrier location</li>
              </ol>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Refund Processing</h3>
              <p className="text-gray-600">
                Once we receive your return, we'll inspect the items and process your refund within 5-7 business days. The refund will be issued to your original payment method. Please allow additional time for your bank to process the refund.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Exchanges</h3>
              <p className="text-gray-600">
                For size or color exchanges, we recommend returning your original item for a refund and placing a new order. This ensures you receive your preferred item as quickly as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-black text-white rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
          <p className="mb-6 text-gray-300">
            Our customer service team is ready to assist you
          </p>
          <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;