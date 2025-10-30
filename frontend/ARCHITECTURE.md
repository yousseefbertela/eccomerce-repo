# 🏛️ ANGAL Frontend Architecture

## Overview
This document outlines the complete frontend architecture for the ANGAL e-commerce platform.

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      REACT APP (SPA)                        │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │              ROUTING LAYER                         │   │
│  │  React Router v6 - Client-side Navigation          │   │
│  │  - Page Transitions (Framer Motion)                │   │
│  │  - Protected Routes                                │   │
│  │  - 404 Handling                                    │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │           LAYOUT LAYER (Always Visible)            │   │
│  │  ┌──────────────┐  ┌──────────────┐               │   │
│  │  │    Header    │  │   Footer     │               │   │
│  │  │ - Nav Menus  │  │ - Newsletter │               │   │
│  │  │ - Search     │  │ - Links      │               │   │
│  │  │ - Cart Icon  │  │ - Social     │               │   │
│  │  └──────────────┘  └──────────────┘               │   │
│  │  ┌──────────────┐  ┌──────────────┐               │   │
│  │  │ Cart Drawer  │  │ Mobile Menu  │               │   │
│  │  └──────────────┘  └──────────────┘               │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │              PAGE COMPONENTS                       │   │
│  │  Home | Shop | Product | Cart | Account | ...     │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │           REUSABLE COMPONENTS                      │   │
│  │  ProductCard | Button | Input | Modal | Badge     │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │            STATE MANAGEMENT                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐        │   │
│  │  │   Auth   │  │   Cart   │  │ Wishlist  │        │   │
│  │  │ Context  │  │ Context  │  │  Context  │        │   │
│  │  └──────────┘  └──────────┘  └───────────┘        │   │
│  │                    │                               │   │
│  │         ┌──────────┴──────────┐                    │   │
│  │         │   LocalStorage      │                    │   │
│  │         └─────────────────────┘                    │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │              API LAYER                             │   │
│  │  Axios Client + Interceptors                       │   │
│  │  - Auto token injection                            │   │
│  │  - Error handling                                  │   │
│  │  - Request/Response transformation                 │   │
│  └────────────────────────────────────────────────────┘   │
│                         │                                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API SERVER                        │
│              (Node.js + Express + MongoDB)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Component Hierarchy

```
App
├── Router
│   └── Routes
│       ├── Layout (wrapper)
│       │   ├── Header
│       │   │   ├── Logo
│       │   │   ├── Navigation
│       │   │   │   └── MegaMenu
│       │   │   └── Icons (Search, Cart, User, Wishlist)
│       │   ├── MobileMenu
│       │   ├── CartDrawer
│       │   │   └── CartItem
│       │   └── Footer
│       │       └── NewsletterForm
│       │
│       └── Pages
│           ├── Home
│           │   ├── HeroSection
│           │   ├── NewArrivals (ProductGrid)
│           │   ├── EditorialBanner
│           │   ├── FeaturedCollection
│           │   └── NewsletterSignup
│           │
│           ├── Shop / Collection
│           │   ├── FilterSidebar
│           │   ├── SortDropdown
│           │   ├── ProductGrid
│           │   │   └── ProductCard
│           │   └── Pagination
│           │
│           ├── Product Detail
│           │   ├── ImageGallery
│           │   ├── ProductInfo
│           │   │   ├── SizeSelector
│           │   │   ├── ColorSelector
│           │   │   └── AddToCart
│           │   ├── Accordion (Details)
│           │   ├── ReviewsList
│           │   └── RelatedProducts
│           │
│           ├── Cart
│           │   ├── CartItem
│           │   ├── CartSummary
│           │   └── QuantitySelector
│           │
│           ├── Checkout
│           │   ├── ShippingForm
│           │   ├── PaymentForm
│           │   └── OrderSummary
│           │
│           └── Account
│               ├── Sidebar
│               ├── Dashboard
│               ├── Orders
│               ├── Wishlist
│               └── Profile
│
└── Providers
    ├── AuthProvider
    ├── CartProvider
    └── WishlistProvider
```

---

## 🔄 Data Flow

### Authentication Flow
```
User Action → AuthContext → API Call → Backend
                ↓
           localStorage
                ↓
        Update User State
                ↓
         Re-render Components
```

### Shopping Cart Flow
```
Add to Cart → CartContext → localStorage + State Update
                                    ↓
                           CartDrawer Opens
                                    ↓
                          Cart Count Updates
```

### Product Browsing Flow
```
Browse → Shop Page → Filter/Sort → API Call → Display Products
            ↓
      Click Product
            ↓
     Product Detail Page → Add to Cart → CartContext
```

---

## 🎭 Animation Strategy

### Page Transitions
- **Route Changes**: Fade out → Fade in (0.3s)
- **Smoothness**: Using Framer Motion's AnimatePresence

### Component Animations
- **Cart Drawer**: Slide from right (0.3s)
- **Mobile Menu**: Slide from left (0.3s)
- **Modals**: Scale + Fade (0.3s)
- **Dropdowns**: Slide down + Fade (0.2s)
- **Product Cards**: Scale on hover (0.2s)

### Scroll Animations
- **Hero Section**: Fade in on load
- **Product Sections**: Fade in up on scroll
- **Images**: Lazy load with blur-up

---

## 📱 Responsive Strategy

### Breakpoints
```css
/* Tailwind defaults */
sm:  640px  /* Small tablets */
md:  768px  /* Tablets */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile-First Approach
```
Base styles: Mobile (< 640px)
  ↓
Add complexity for larger screens
  ↓
Desktop features (mega menus, hover states)
```

### Key Responsive Features
- **Navigation**: Hamburger menu → Full nav bar
- **Product Grid**: 1 col → 2 col → 3 col → 4 col
- **Cart**: Full page → Drawer on desktop
- **Images**: Different sizes per breakpoint

---

## 🔐 Security Features

### Client-Side
- **JWT Storage**: localStorage (httpOnly not available in SPA)
- **Token Expiry**: Handled by backend
- **Auto Logout**: On 401 responses
- **XSS Prevention**: React's built-in escaping

### Best Practices
- No sensitive data in client state
- API keys in environment variables
- HTTPS only in production
- Content Security Policy headers

---

## ⚡ Performance Optimizations

### Code Splitting
```javascript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
```

### Image Optimization
- **Format**: WebP with JPG fallback
- **Loading**: Lazy loading below fold
- **Responsive**: srcset for different sizes
- **Placeholders**: Blur-up while loading

### Caching Strategy
- **Static Assets**: Long-term caching
- **API Responses**: Short-term caching
- **LocalStorage**: Cart, Wishlist, User prefs

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Minification**: Terser in production
- **Compression**: Gzip/Brotli on server

---

## 🧪 Testing Strategy (Future)

### Unit Tests
- Components (React Testing Library)
- Utility functions (Jest)
- Context providers

### Integration Tests
- User flows (Cypress/Playwright)
- Form submissions
- Cart operations

### E2E Tests
- Complete checkout flow
- Authentication flow
- Product browsing

---

## 🚀 Deployment Pipeline

```
Development → Staging → Production
     ↓           ↓          ↓
   Local      Vercel     Vercel
              Preview    Production
```

### Build Process
```bash
npm run build
  ↓
Vite bundles assets
  ↓
Optimizes images, CSS, JS
  ↓
Generates dist/ folder
  ↓
Deploy to hosting
```

---

## 📚 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Routing** | React Router 6 |
| **Styling** | Tailwind CSS 3 + DaisyUI 4 |
| **Animations** | Framer Motion |
| **State** | Context API + LocalStorage |
| **HTTP** | Axios |
| **Build** | Vite 7 |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |

---

## 🎯 Next Steps

1. ✅ Core infrastructure complete
2. ⏳ Build Home Page components
3. ⏳ Build Shop/Collection pages  
4. ⏳ Build Product Detail page
5. ⏳ Build Cart & Checkout flow
6. ⏳ Build Account pages
7. ⏳ Add animations throughout
8. ⏳ Performance optimization
9. ⏳ Testing
10. ⏳ Backend integration

---

**Architecture Status**: ✅ Foundation Complete
**Ready For**: Component Development (Phase 2)
