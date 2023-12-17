// UserDropdown.tsx
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const categories = ["Sofas", "Chairs", "Tables", "Desks", "Beds"];


const HomeMenu: React.FC = () => {
    const [authAnchorEl, setAuthAnchorEl] = useState<null | HTMLElement>(null);

    const handleAuthMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAuthAnchorEl(event.currentTarget);
    };

    const handleAuthMenuClose = () => {
        setAuthAnchorEl(null);
    };
    
    return (
        <div>
            <IconButton
                edge="end"
                color="primary"
                aria-label="account of current user"
                aria-controls="auth-menu"
                aria-haspopup="true"
                onClick={handleAuthMenuOpen}
            >
                Home            
            </IconButton>
            <Menu
                id="auth-menu"
                anchorEl={authAnchorEl}
                keepMounted
                open={Boolean(authAnchorEl)}
                onClose={handleAuthMenuClose}
            >
                    {categories.map((category, index) => (
                        <MenuItem key={index} sx={{ padding: '0 16px', cursor: 'pointer' }}>
                            {category}
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    );
};

export default HomeMenu;