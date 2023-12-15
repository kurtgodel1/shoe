import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoginForm from './components/auth_components/LoginForm';
import RegistrationForm from './components/auth_components/RegistrationForm';
import Navbar from './components/Navbar';
import { SpeedInsights } from '@vercel/speed-insights/react';

// import './App.css

function App() {

  return (
      <Router>
          <Navbar />
          <Container style={{ width: '100%' }}>
              <Box my={4} style={{ width: '100%' }}>
                  <Routes>
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegistrationForm />} />
                      {/* More routes */}
                  </Routes>
              </Box>
          </Container>
          <SpeedInsights />
      </Router>
  );
}

export default App;
