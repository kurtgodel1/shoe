import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';


const dispatch = useDispatch();


const logoutUser = async () => {
    try {
        await axios.post('http://localhost:8000/auth_app/logout/'); // Adjust the URL as needed
        // Clear authentication state
        // E.g., remove token from local storage and update Redux state
        localStorage.removeItem('token');
        dispatch(logout());
    } catch (error) {
        console.error('Logout error:', error);
        // Handle errors (e.g., display error message)
    }
};
