import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice';
import config from '../../config'

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.API_URL}/auth_app/login/`, {
                username,
                password
            });
            const token = response.data.token; // Adjust based on your backend response structure
            localStorage.setItem('token', token); // Storing the token in localStorage
            dispatch(login({ user: response.data.user, token: response.data.token }));
            // Handle success (e.g., store token, redirect to protected route)
        } catch (error) {
            console.error('Login error:', error);
            // Handle errors (e.g., display error message)
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
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
