import React from 'react';
import { Box,  AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // Update the path as needed
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons'; // Update the path as needed
import { styled, alpha } from '@mui/material/styles';
import SearchBar from './SearchBar';  // Update the import path as needed
import CartDropdown from '../CartDropdown'; // Update the path as needed


const NavBar: React.FC = () => {

    const handleSearch = (searchTerm: string) => {
        console.log('Search Term:', searchTerm);
        // Implement the search functionality here
      };


    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        backgroundColor: 'white',
        color: theme.palette.primary.contrastText,
        boxShadow: 'none',
        borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }));


    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <AppBarStyled position="fixed" >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ayakkabı
                </Typography>
                <CartDropdown />
                <SearchBar onSearch={handleSearch} />
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
        </AppBarStyled>
    );
};

export default NavBar;
