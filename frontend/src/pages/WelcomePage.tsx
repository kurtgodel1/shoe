import React, { useState, useEffect } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { Example } from '../components/MouseImageTrail';
import SignInSide from '../components/auth_components/SignInSide';
import SignUpSide from '../components/auth_components/SignUpSide';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const MyPage = () => {
    const location = useLocation();
  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLoginDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setLoginDrawerOpen(open);
    if (open) setSignUpDrawerOpen(false);
  };

  const toggleSignUpDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSignUpDrawerOpen(open);
    if (open) setLoginDrawerOpen(false);
  };

  useEffect(() => {
    // Check the current path and update state accordingly
    if (location.pathname === '/login') {
      setLoginDrawerOpen(true);
      setSignUpDrawerOpen(false);
    } else if (location.pathname === '/register') {
      setSignUpDrawerOpen(true);
      setLoginDrawerOpen(false);
    }
  }, [location]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Example />

      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 2,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2 
      }}>
        <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
        <Button variant="outlined" onClick={() => navigate('/register')}>Sign Up</Button>
        <Button variant="outlined" onClick={() => navigate('/home')}>HomePage</Button>
      </Box>

      <Drawer anchor="left" open={isLoginDrawerOpen} onClose={(event) => {
    toggleLoginDrawer(false)(event);
    navigate('/');
  }}>
        <SignInSide/>
      </Drawer>

      <Drawer anchor="right" open={isSignUpDrawerOpen} onClose={(event) => {
    toggleSignUpDrawer(false)(event);
    navigate('/');
  }}>
        <SignUpSide/>
      </Drawer>
    </div>
  );
};

export default MyPage;
