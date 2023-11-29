import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit" disabled={isSubmitting}>Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default LoginForm;
