import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
      <section className="section-padding min-h-screen bg-white">
        <div className="container-custom max-w-md mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-display font-light uppercase tracking-[0.2em] mb-8">404 - Not Found</h1>
          <p className="text-gray-600 mb-6 font-light">Sorry, the page you are looking for does not exist.</p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </section>
  );
};

export default NotFound;
