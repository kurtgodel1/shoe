import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchBar from './SearchBar';  // Update the import path as needed
import CartDropdown from '../CartDropdown'; // Update the path as needed
import UserDropdown from './UserDropdown';
import logo from '../../../public/logo.png';


const NavBarTop: React.FC = () => {

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
        height: '5rem',
        justifyContent: 'center',
    }));

    return (
        <AppBarStyled position="static" color="inherit" elevation={0} >
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ height: '70px', marginRight: '10px' }} /> {/* Add this line */}
            <Typography variant="h6" color="primary" sx={{ flexGrow: 0.5 }}>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <SearchBar onSearch={handleSearch} />
                <Box sx={{ flexGrow: 1 }} />
                <CartDropdown />
                <UserDropdown />
            </Toolbar>
        </AppBarStyled>
    );
};

export default NavBarTop;
