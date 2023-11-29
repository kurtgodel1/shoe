import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PowerGraph from './components/PowerGraph';
import MathExpression from './components/MathExpression';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CounterComponent from './components/CounterComponent';
import LoginForm from './components/auth_components/LoginForm';
import RegistrationForm from './components/auth_components/RegistrationForm';
import Navbar from './components/Navbar';
// import './App.css

function App() {

  return (
      <Router>
          <Navbar />
          <Container>
              <Box my={4}>
                  <Routes>
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegistrationForm />} />
                      <Route path="/" element={<PowerGraph />} />
                      <Route path="/math" element={<MathExpression />} />
                      <Route path="/counter" element={<CounterComponent />} />
                      {/* More routes */}
                  </Routes>
              </Box>
          </Container>
      </Router>
  );
}

export default App;
