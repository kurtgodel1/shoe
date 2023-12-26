import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import EncryptButton from '../EncryptButton';
import DottedButton from '../DottedButton';
import StaggeredDropDown from '../StaggeredDropDown';

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
                <Box sx={{ flexGrow: .1 }} />
                <EncryptButton />
                <Box sx={{ flexGrow: .1 }} />
                <DottedButton />
                <Box sx={{ flexGrow: .1 }} />
                <StaggeredDropDown />
            </Toolbar>
        </AppBarStyled>
    );
};

export default NavBar;
