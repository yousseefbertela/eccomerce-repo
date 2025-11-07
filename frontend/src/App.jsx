import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider, WishlistProvider, OrderProvider, ReviewProvider, CurrencyProvider } from './context';
import toast, { Toaster } from 'react-hot-toast';

// Pages (will be created next)
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import NewArrivals from './pages/NewArrivals';
import Collections from './pages/Collections';

// Layout
import Layout from './components/layout/Layout';
import Collection from './pages/Collection';
import Product from './pages/Product';
import SizeGuide from './pages/SizeGuide';
import Sustainability from './pages/Sustainability';
import ExitIntentPopup from './components/ui/ExitIntentPopup';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Admin
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Users from './pages/admin/Users';
import Reviews from './pages/admin/Reviews';
import Carts from './pages/admin/Carts';
import Wishlists from './pages/admin/Wishlists';

function App() {
  if (typeof window !== 'undefined') {
    window.toast = toast;
  }
  return (
    <Router>
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <ReviewProvider>
                  <Toaster position="top-center" />
                  <ExitIntentPopup />
                  <Layout>
                  <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:slug" element={<Collection />} />
                <Route path="/product/:slug" element={<Product />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Protected Routes - Require Authentication */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/account/*" element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                } />
                
                {/* Public Info Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                
                {/* Admin Routes - Require Admin Role */}
                <Route path="/admin" element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="users" element={<Users />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="carts" element={<Carts />} />
                  <Route path="wishlists" element={<Wishlists />} />
                </Route>
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
                </ReviewProvider>
              </OrderProvider>
            </WishlistProvider>
        </CartProvider>
      </AuthProvider>
      </CurrencyProvider>
    </Router>
  );
}

export default App;
