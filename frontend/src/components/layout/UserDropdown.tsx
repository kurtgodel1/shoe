import { FiChevronDown, FiLogIn, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import config from '../../config';
import { RootState } from '../../store/store';
import AccountCircle from '@mui/icons-material/AccountCircle';



const UserDropDown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${config.API_URL}/auth_app/logout/`); // Adjust the URL as needed
      dispatch(logout());
      navigate('/login');
      } catch (error) {
          console.error('Logout error:', error);
      }
  };

  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm"><AccountCircle /></span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%", zIndex: 1 }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {isLoggedIn ? (
          <Option setOpen={setOpen} Icon={FiLogOut} text="Logout" onClick={handleLogout} />
        ) : (
          <>
            <Option setOpen={setOpen} Icon={FiLogIn} text="Login" onClick={handleLogin} />
            <Option setOpen={setOpen} Icon={FiLogIn} text="Sign Up" onClick={() => navigate('/signup')} />
          </>
        )}        
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  onClick,
}: {
  text: string;
  Icon: IconType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    setOpen(false);
    if (onClick) onClick();
  };
  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default UserDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};