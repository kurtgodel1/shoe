import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config'
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.API_URL}/auth_app/register/`, {
                username,
                email,
                password
            });
            console.log(response.data);
            navigate('/login');

            // Handle success (e.g., display a success message, navigate to login page, etc.)
        } catch (error) {
            console.error('Registration error:', error);
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
