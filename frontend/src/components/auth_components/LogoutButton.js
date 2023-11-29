import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import config from '../../config'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutUser = async () => {
      try {
        await axios.post(`${config.API_URL}/auth_app/logout/`); // Adjust the URL as needed
        // Clear authentication state
        // E.g., remove token from local storage and update Redux state
        dispatch(logout());
        navigate('/login');

      } catch (error) {
        console.error('Logout error:', error);
        // Handle errors (e.g., display error message)
      }
    };
  
    return (
          <Button color="inherit" onClick={LogoutUser}>
            Logout
          </Button>
    );
  }
  
  export default LogoutButton;