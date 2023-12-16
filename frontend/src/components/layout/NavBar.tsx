import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import SearchBar from './SearchBar';  // Update the import path as needed
import CartDropdown from '../CartDropdown'; // Update the path as needed
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserDropdown from './UserDropdown';

const NavBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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

    return (
        <AppBarStyled position="fixed" >
            <Toolbar>
            <IconButton
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onMouseOver={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{ onMouseLeave: handleMenuClose }}
                >
                    <MenuItem onClick={handleMenuClose}>Menu Item 1</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Menu Item 2</MenuItem>
                    {/* Add more menu items here */}
                </Menu>
                <Typography color="GrayText" variant="h6" sx={{ flexGrow: 1 }}>
                    Ayakkabı
                </Typography>
                <CartDropdown />
                <SearchBar onSearch={handleSearch} />
                <UserDropdown />
            </Toolbar>
        </AppBarStyled>
    );
};

export default NavBar;
