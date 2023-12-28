import React, { ReactNode } from 'react';
import { Box, Container} from '@mui/material';
import NavBar from './NavBar';
import AnimateOnScroll from '../homepage/AnimateOnScroll';
import Footer from '../homepage/Footer';
import NewsletterSignUp from '../homepage/NewsletterSignUp';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {    

    return (
        <Box >
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
