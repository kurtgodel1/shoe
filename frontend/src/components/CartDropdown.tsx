// CartDropdown.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Typography, Badge, IconButton, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RootState } from '../store/store'; // Update the path as needed
import { increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice'; // Update the path as needed
import { CartItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

const CartDropdown: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleIncrease = (productId: number) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecrease = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };


    const handleCheckout = () => {
        handleClose();
        navigate('/checkout');
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item: CartItem) => (
                            <MenuItem key={item.product.id}>
                                <Typography style={{ flexGrow: 1 }}>
                                    {item.product.name} - {item.quantity}
                                </Typography>
                                <IconButton onClick={() => handleDecrease(item.product.id)}>
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => handleIncrease(item.product.id)}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </MenuItem>
                        ))}
                        <Divider />
                        <MenuItem onClick={handleCheckout}>
                            Go to Checkout
                        </MenuItem>
                    </div>
                ) : (
                    <MenuItem>Your cart is empty</MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default CartDropdown;
