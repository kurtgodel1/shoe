import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (username.trim() === '') {
            setError('Username is required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('A valid email is required.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${config.API_URL}/auth_app/register/`, {
                username,
                email,
                password
            });
            console.log(response.data);
            navigate('/login');
            // Handle success (e.g., display a success message, navigate to login page, etc.)
        } catch (err) {
            console.error('Registration error:', err);
            setError('Failed to register. Please check your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
    <Box component="form" onSubmit={handleSubmit} sx={{  maxWidth: '500px', margin: '0 auto' }}>
        <TextField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            fullWidth
            margin="normal"
        />
        <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
        />
        <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
    </Box>
    );
}

export default RegistrationForm;
