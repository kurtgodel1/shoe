import React, { useState, useRef } from 'react';
import { Box, Button, Paper, MenuItem, MenuList, Popper, Grow } from '@mui/material';

const HomeMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'inline' }}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover to Open
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
                <MenuItem onClick={handleMouseLeave}>Option 1</MenuItem>
                <MenuItem onClick={handleMouseLeave}>Option 2</MenuItem>
                <MenuItem onClick={handleMouseLeave}>Option 3</MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default HomeMenu;
