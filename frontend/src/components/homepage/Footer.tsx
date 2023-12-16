// Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: '#333', color: 'white', padding: 2, textAlign: 'center' }}>
            <Typography variant="body1">© 2023 Shoe Store</Typography>
            <Link href="/about" color="inherit" sx={{ padding: 1 }}>About Us</Link>
            <Link href="/contact" color="inherit" sx={{ padding: 1 }}>Contact</Link>
            {/* Additional links and information */}
        </Box>
    );
};

export default Footer;
