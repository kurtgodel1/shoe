import React, { ReactNode } from 'react';
import { Box, Container, Typography} from '@mui/material';
import NavBar from './NavBar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {    

    return (
        <Box sx={{ display: 'flex',  minHeight: '100vh', bgcolor: 'background.default' }}>
            <NavBar />
            <Box 
                component="main" 
                sx={{ flexGrow: 1, p: 3, mt: 8, display: 'flex', flexDirection: 'column', width: '100%' }}
            >
                <Container maxWidth={false} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Container>
                <Box component="footer" sx={{ textAlign: 'center', py: 2, mt: 4, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2">© 2023 My Application</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
