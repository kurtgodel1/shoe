import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { ImageTrail } from '../components/MouseImageTrail';
import SignInSide from '../components/auth_components/SignInSide';
import SignUpSide from '../components/auth_components/SignUpSide';
import { useNavigate, useLocation } from 'react-router-dom';

const MyPage: React.FC = () => {
  const location = useLocation();
  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState<boolean>(false);
  const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleLoginDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (event && event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
      return;
    }
    setLoginDrawerOpen(open);
    if (open) setSignUpDrawerOpen(false);
  };

  const toggleSignUpDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (event && event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
      return;
    }
    setSignUpDrawerOpen(open);
    if (open) setLoginDrawerOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/login') {
      setLoginDrawerOpen(true);
      setSignUpDrawerOpen(false);
    } else if (location.pathname === '/register') {
      setSignUpDrawerOpen(true);
      setLoginDrawerOpen(false);
    } else if (location.pathname === '/') {
        setSignUpDrawerOpen(false);
        setLoginDrawerOpen(false);
      }
  }, [location]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <ImageTrail />

      <Box sx={{ 
        position: 'absolute', 
        bottom: 50, // Aligns the box to the top of the page
        left: '50%', 
        transform: 'translateX(-50%)', // Centers the box horizontally
        zIndex: 1000,
        display: 'flex', 
        flexDirection: 'row', // Aligns buttons side by side
        alignItems: 'center', 
        justifyContent: 'center', // Centers buttons in the flex container
        gap: 2, // Space between buttons
        paddingTop: '20px' // Adds some space from the top
      }}>
        <Button variant="contained" onClick={() => navigate('/home')}>HomePage</Button>
        <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
        <Button variant="contained" onClick={() => navigate('/register')}>Sign Up</Button>
      </Box>

      <Drawer anchor="left" open={isLoginDrawerOpen} variant="persistent" onClose={(event) => {
        toggleLoginDrawer(false)(event as MouseEvent | KeyboardEvent);
        navigate('/');
      }}   sx={{ width: { md: '30%' } }} // apply width on medium screens and up
      >
        <SignInSide/>
      </Drawer>

      <Drawer anchor="right" open={isSignUpDrawerOpen} variant="persistent" onClose={(event) => {
        toggleSignUpDrawer(false)(event as MouseEvent | KeyboardEvent);
        navigate('/');
      }}   sx={{ width: { md: '30%' } }} // apply width on medium screens and up
      >
        <SignUpSide/>
      </Drawer>
    </div>
  );
};

export default MyPage;
