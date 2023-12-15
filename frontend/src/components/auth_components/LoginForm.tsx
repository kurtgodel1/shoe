import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice'; // Update the path as needed
import config from '../../config'; // Update the path as needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Container } from '@mui/material';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = (): boolean => {
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

    const handleSubmit = async (event: FormEvent) => {
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
                    {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </Container>
    );
};

export default LoginForm;
