import React, { ReactNode } from 'react';
import { Box, Container, Typography} from '@mui/material';
import NavBar from './NavBar';
import NavBarTop from './NavBarTop';
import AnimateOnScroll from '../homepage/AnimateOnScroll';
import Footer from '../homepage/Footer';
import NewsletterSignUp from '../homepage/NewsletterSignUp';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {    

    return (
        <Box >
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 1, px: 2 }}>
                <Typography variant="body2" align="center">
                    Free shipping on orders over $50!
                </Typography>
            </Box>
            <NavBarTop/>
            <NavBar/>
            <Box 
                component="main" 
                sx={{ flexGrow: 1, p: 3, mt: 8, display: 'flex', flexDirection: 'column', width: '100%' }}
            >
                <Container maxWidth={false} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Container>
                <AnimateOnScroll className="section"><NewsletterSignUp /></AnimateOnScroll>
                <AnimateOnScroll><Footer /></AnimateOnScroll>
            </Box>
        </Box>
    );
};

export default MainLayout;
