import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LoginButton, RegisterButton, LogoutButton } from './auth_components/AuthButtons'; // Update the path as needed
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Update the path as needed

const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ayakkabı
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isLoggedIn && (
            <>
              <LoginButton />
              <RegisterButton />
            </>
          )}
          {isLoggedIn && <LogoutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
