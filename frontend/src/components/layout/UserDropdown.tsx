// UserDropdown.tsx
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const UserDropdown: React.FC = () => {
    const [authAnchorEl, setAuthAnchorEl] = useState<null | HTMLElement>(null);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleAuthMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAuthAnchorEl(event.currentTarget);
    };

    const handleAuthMenuClose = () => {
        setAuthAnchorEl(null);
    };
    
    return (
        <>
            <IconButton
                edge="end"
                color="primary"
                aria-label="account of current user"
                aria-controls="auth-menu"
                aria-haspopup="true"
                onClick={handleAuthMenuOpen}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="auth-menu"
                anchorEl={authAnchorEl}
                keepMounted
                open={Boolean(authAnchorEl)}
                onClose={handleAuthMenuClose}
            >
                {!isLoggedIn ? (
                    <>
                        <MenuItem onClick={handleAuthMenuClose}><LoginButton /></MenuItem>
                        <MenuItem onClick={handleAuthMenuClose}><RegisterButton /></MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleAuthMenuClose}><LogoutButton /></MenuItem>
                )}
            </Menu>
        </>
    );
};

export default UserDropdown;