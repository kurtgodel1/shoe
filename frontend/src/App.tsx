import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoginForm from './components/auth_components/LoginForm';
import RegistrationForm from './components/auth_components/RegistrationForm';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// import './App.css

function App() {

  return (
      <Router>
        <MainLayout>
          <Container style={{ width: '100%' }}>
              <Box my={4} style={{ width: '100%' }}>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductListingPage />} />
                      <Route path="/product/:productId" element={<ProductDetailPage />} />
                      <Route path="/cart" element= {<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegistrationForm />} />
                      {/* More routes */}
                  </Routes>
              </Box>
          </Container>
        </MainLayout>
          <SpeedInsights />
      </Router>
  );
}

export default App;
