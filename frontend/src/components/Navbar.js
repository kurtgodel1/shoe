import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LoginButton, RegisterButton, LogoutButton } from './auth_components/AuthButtons';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Scientific Calculations
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
}

export default Navbar;
