// NewsletterSignUp.tsx
import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import './NewsletterSignUp.css';


const NewsletterSignUp: React.FC = () =>{
    return (
        <Box className="newsletter-signup" sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Stay Updated</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Sign up for our newsletter to get the latest news and special offers.
            </Typography>
            <form>
                <TextField label="Your Email" variant="outlined" sx={{ marginRight: 1 }} />
                <Button variant="contained" color="primary">Subscribe</Button>
            </form>
        </Box>
    );
};

export default NewsletterSignUp;
