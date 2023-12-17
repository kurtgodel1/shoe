// UserDropdown.tsx
import {MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState, useRef } from 'react';
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Box, Button, Paper, MenuList, Popper, Grow } from '@mui/material';


const UserDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    
    return (
        <Box sx={{ display: 'inline' }}>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AccountCircle />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <MenuList autoFocusItem={open} id="menu-list-grow">
                {!isLoggedIn ? (
                    <div>
                        <MenuItem onClick={handleMouseLeave}><LoginButton /></MenuItem>
                        <MenuItem onClick={handleMouseLeave}><RegisterButton /></MenuItem>
                    </div>
                ) : (
                    <MenuItem onClick={handleMouseLeave}><LogoutButton /></MenuItem>
                )}
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    );
};

export default UserDropdown;

