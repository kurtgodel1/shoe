import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductListingPage from './pages/ProductListingPage';
import WelcomePage from './pages/WelcomePage';

// import './App.css

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<WelcomePage />} />
      <Route path="/register" element={<WelcomePage />} />
      <Route path="/*" element={
        <MainLayout>
          <Container style={{ width: '100%' }}>
            <Box my={4} style={{ width: '100%' }}>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                {/* More routes */}
              </Routes>
            </Box>
          </Container>
        </MainLayout>
      } />
    </Routes>
    <SpeedInsights />
  </Router>
  );
}

export default App;
