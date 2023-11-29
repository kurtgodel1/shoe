import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        if (username.trim() === '') {
            setError('Username is required.');
            return false;
        }
        if (password.trim() === '') {
            setError('Password is required.');
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
            const response = await axios.post(`${config.API_URL}/auth_app/login/`, {
                username,
                password
            });
            
            dispatch(login({ user: response.data.user, token: response.data.token }));
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError('Failed to log in. Please check your username and password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{  maxWidth: '500px', margin: '0 auto' }}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
            >
                Sign In
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
}

export default LoginForm;
