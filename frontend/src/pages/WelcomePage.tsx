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
    // Check if the location state has a parameter to open the login drawer
    if (location.state?.openLoginDrawer) {
      toggleLoginDrawer(true);
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
        <Button variant="outlined" onClick={toggleLoginDrawer(true)}>Login</Button>
        <Button variant="outlined" onClick={toggleSignUpDrawer(true)}>Sign Up</Button>
        <Button variant="outlined" onClick={() => navigate('/home')}>HomePage</Button>
      </Box>

      <Drawer anchor="left" open={isLoginDrawerOpen} onClose={toggleLoginDrawer(false)}>
        <SignInSide toggleSignUpDrawer={toggleSignUpDrawer}/>
      </Drawer>

      <Drawer anchor="right" open={isSignUpDrawerOpen} onClose={toggleSignUpDrawer(false)}>
        <SignUpSide toggleLoginDrawer={toggleLoginDrawer}/>
      </Drawer>
    </div>
  );
};

export default MyPage;
