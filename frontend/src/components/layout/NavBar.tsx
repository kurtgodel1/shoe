import React, { ReactElement } from 'react';
import { AppBar, Toolbar, Box, Slide, useScrollTrigger } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CartDropdown from '../CartDropdown'; // Update the path as needed
import UserDropdown from './UserDropdown';
import EncryptButton from '../EncryptButton';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiInstagram } from "react-icons/fi";
import StaggeredDropDown from '../StaggeredDropDown';
import { FiEdit} from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";


function HideOnScroll(props: { children: ReactElement }) {
    const { children } = props;
    // Trigger for detecting scroll
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => navigate('/home');
    const handleProductsClick = () => navigate('/products');
    const handleDalleClick = () => navigate('/dalle');

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
        <>
            <HideOnScroll>
                <AppBarStyled>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* Mobile Menu Icon */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <StaggeredDropDown
                            title="Post"
                            options={[
                                { text: 'Home', Icon: FiEdit, onClick: handleHomeClick },
                                { text: 'Products', Icon: FaInstagram, onClick: handleProductsClick },
                                // ... other options ...
                            ]}
                            />                        
                        </Box>
                        {/* Desktop Items */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            <EncryptButton targetText='Home' handleClick={handleHomeClick} logo={<FiHome />} />
                            <EncryptButton targetText='Products' handleClick={handleProductsClick} logo={<FiInstagram />} />
                            <EncryptButton targetText='DALL-E 3' handleClick={handleDalleClick} logo={<FiInstagram />} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Right items - Visible on all screen sizes */}
                        <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap: 2 }}>
                            <CartDropdown />
                            <UserDropdown />
                        </Box>                        
                    </Toolbar>
                </AppBarStyled>
            </HideOnScroll>
        </>
    );
};

export default NavBar;
