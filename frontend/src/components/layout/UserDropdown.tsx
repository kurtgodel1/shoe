// UserDropdown.tsx
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState, useRef } from 'react';
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Box, Button, Paper, MenuItem, MenuList, Popper, Grow} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const UserDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMouseEnter = () => {
      setOpen(true);
    };

    const handleMouseLeave = () => {
      setOpen(false);
    };

    const customGrowStyle = {
      transformOrigin: 'top center',
      // Adjust these values as needed to control the speed and nature of the animation
      transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    };

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    
    return (
      <Box sx={{ display: 'inline', zIndex: 'tooltip' }}>
      <Button
        sx={{transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' },
          color: 'black' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        endIcon={<ArrowDropDownIcon />}
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
          <Grow {...TransitionProps} style={customGrowStyle}>
            <Paper
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{ width: 'fit-content' }} // Adjust the width as needed
            >
              <MenuList autoFocusItem={open} sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Creates new columns as needed
                gridGap: '8px' // Adjust gap as needed
              }}>
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

