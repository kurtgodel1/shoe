import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PowerGraph from './components/PowerGraph';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MathExpression from './components/MathExpression';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CounterComponent from './components/CounterComponent';
import LoginForm from './components/auth_components/LoginForm';
import RegistrationForm from './components/auth_components/RegistrationForm';
import LogoutButton from './components/auth_components/LogoutButton';
import RegisterButton from './components/auth_components/RegisterButton';

// import './App.css

function App() {

  return (
      <Router>
          <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Scientific Calculations
                    </Typography>
                    <RegisterButton />
                    <LogoutButton />
                </Toolbar>          
          </AppBar>
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
