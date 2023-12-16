// PromotionalBanner.tsx
import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const PromotionalBanner : React.FC = () =>{
    return (
        <Paper sx={{ padding: 2, margin: 2, backgroundColor: '#f50057', color: 'white', textAlign: 'center' }}>
            <Typography variant="h5">
                Limited Time Offer!
            </Typography>
            <Typography variant="body1">
                Get 20% off on all sports shoes. Hurry, offer ends soon!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="inherit">
                    Shop Now
                </Button>
            </Box>
        </Paper>
    );
};

export default PromotionalBanner;
