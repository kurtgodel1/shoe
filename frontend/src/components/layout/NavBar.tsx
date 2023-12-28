import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CartDropdown from '../CartDropdown'; // Update the path as needed
import UserDropdown from './UserDropdown';
import EncryptButton from '../EncryptButton';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiInstagram } from "react-icons/fi";



const NavBar: React.FC = () => {
    const navigate = useNavigate();

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

    const handleHomeClick = () => {
        navigate('/home'); // Navigates to the register page
    }; 

    const handleProductsClick = () => {
        navigate('/products'); // Navigates to the register page
    }; 

    return (
        <AppBarStyled position="static" color="inherit" elevation={0} >
            <Toolbar>
                <Box sx={{ flexGrow: .1 }} />
                <EncryptButton targetText='Home' handleClick={handleHomeClick} logo={<FiHome />} />
                <Box sx={{ flexGrow: .1 }} />
                <EncryptButton targetText='Products' handleClick={handleProductsClick} logo={<FiInstagram />}/>
                <Box sx={{ flexGrow: 1 }} />
                <CartDropdown />
                <UserDropdown />
            </Toolbar>
        </AppBarStyled>
    );
};

export default NavBar;
