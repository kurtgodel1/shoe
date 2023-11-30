import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Container } from '@mui/material';

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
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </Container>
    );
}

export default RegistrationForm;
