import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { UIProvider } from './context/UIContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UIProvider>
            <App />
            <Toaster 
              position="top-right" 
              toastOptions={{ 
                duration: 3000,
                style: {
                  background: 'var(--fallback-b1,oklch(var(--b1)))',
                  color: 'var(--fallback-bc,oklch(var(--bc)))',
                  border: '1px solid var(--fallback-b3,oklch(var(--b3)))',
                }
              }} 
            />
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
