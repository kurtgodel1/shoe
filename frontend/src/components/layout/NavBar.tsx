import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import UserDropdown from './UserDropdown';
import HomeMenu from './HomeMenu';

const NavBar: React.FC = () => {

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
        <AppBarStyled position="static" color="inherit" elevation={0} >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <HomeMenu />
                <HomeMenu />
                <HomeMenu />
                <HomeMenu />
                <HomeMenu />
                <HomeMenu />
                <HomeMenu />
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBarStyled>
    );
};

export default NavBar;
