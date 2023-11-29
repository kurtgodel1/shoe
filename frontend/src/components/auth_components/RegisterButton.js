import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




function RegisterButton() {
    const navigate = useNavigate();

    const Register = async () => {
      try {
        
        navigate('/register');

      } catch (error) {
        console.error('Logout error:', error);
      }
    };
  
    return (
          <Button color="inherit" onClick={Register}>
            Register
          </Button>
    );
  }
  
  export default RegisterButton;