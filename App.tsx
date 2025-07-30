


import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation, Outlet, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { StoresPage } from './components/StoresPage';
import { WishlistPage } from './components/WishlistPage';
import { ProfilePage } from './components/ProfilePage';

// Checkout Components
import { CheckoutLayout } from './components/checkout/CheckoutLayout';
import { ShippingPage } from './components/checkout/ShippingPage';
import { PaymentPage } from './components/checkout/PaymentPage';
import { OrderSuccessPage } from './components/checkout/OrderSuccessPage';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminProductsPage } from './components/admin/AdminProductsPage';
import { AdminProductFormPage } from './components/admin/AdminProductFormPage';


const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const AppCore: React.FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="products/new" element={<AdminProductFormPage />} />
                    <Route path="products/edit/:id" element={<AdminProductFormPage />} />
                    {/* Redirect /admin to /admin/products */}
                    <Route index element={<Navigate to="products" replace />} />
                </Route>

                {/* Checkout Routes */}
                <Route path="/checkout" element={<CheckoutLayout />}>
                    <Route path="shipping" element={<ShippingPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                </Route>
                <Route path="/order-success" element={<OrderSuccessPage />} />

                {/* Main Site Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/stores" element={<StoresPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/:section" element={<ProfilePage />} />
                    <Route path="/faq" element={<div className="p-8"><h1>Часто задаваемые вопросы</h1></div>} />
                    <Route path="/privacy" element={<div className="p-8"><h1>Политика конфиденциальности</h1></div>} />
                </Route>
                
                {/* Fallback route to home if nothing matches */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppCore />
    </AppProvider>
  );
};

export default App;