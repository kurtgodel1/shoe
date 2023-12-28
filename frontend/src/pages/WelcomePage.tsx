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
        toggleLoginDrawer(false)(event as MouseEvent | KeyboardEvent);
        navigate('/');
      }}>
        <SignInSide/>
      </Drawer>

      <Drawer anchor="right" open={isSignUpDrawerOpen} onClose={(event) => {
        toggleSignUpDrawer(false)(event as MouseEvent | KeyboardEvent);
        navigate('/');
      }}>
        <SignUpSide/>
      </Drawer>
    </div>
  );
};

export default MyPage;
