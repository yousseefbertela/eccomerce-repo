import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = {
      hasError: true,
      error,
      errorInfo
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white p-8 rounded shadow-lg text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <AlertTriangle className="w-20 h-20 mx-auto text-red-500" />
            </motion.div>
            
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. The page encountered an error.
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Reload Page
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 p-4 bg-red-50 text-red-800 text-xs overflow-auto rounded">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
