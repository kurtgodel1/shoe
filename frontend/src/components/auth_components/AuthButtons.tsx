import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice'; // Adjust the path as needed
import config from '../../config'; // Adjust the path as needed
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
    const navigate = useNavigate();

    const login = async () => {
        try {
            // Implement your login logic here
            navigate('/login');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Button color="inherit" onClick={login}>
            Login
        </Button>
    );
};

const RegisterButton: React.FC = () => {
    const navigate = useNavigate();

    const register = async () => {
        try {
            // Implement your register logic here
            navigate('/register');
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <Button color="inherit" onClick={register}>
            Register
        </Button>
    );
};

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            await axios.post(`${config.API_URL}/auth_app/logout/`); // Adjust the URL as needed
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Button color="inherit" onClick={logoutUser}>
            Logout
        </Button>
    );
};

export { LoginButton, RegisterButton, LogoutButton };
