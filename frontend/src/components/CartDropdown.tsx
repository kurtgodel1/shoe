// CartDropdown.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Menu, MenuItem, Typography, Badge, IconButton, Divider, Grid } from '@mui/material';
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

    const handleGoToCart = () => {
        handleClose();
        navigate('/cart');
    }

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
                MenuListProps={{
                    style: {
                      width: '350px', // Adjust the width as needed
                    },
                  }}
            >
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item: CartItem) => (
                            <MenuItem key={item.product.id}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Product Image */}
                                <Grid item xs={4}>
                                    <img src={item.product.images?.[0].image} alt={item.product.name} style={{ width: '100%', objectFit: 'contain' }} />
                                </Grid>

                                {/* Product Info and Actions */}
                                <Grid item xs={8}>
                                    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                        <Typography variant="h6" sx={{ color: 'gray' }}>{item.product.name}</Typography>
                                        <Box display="flex" alignItems="center" my={1}>
                                            <IconButton onClick={() => handleDecrease(item.product.id)} color="primary" size="small">
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{item.quantity}</Typography>
                                            <IconButton onClick={() => handleIncrease(item.product.id)} size="small">
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'orange' }}>
                                            ${item.quantity * item.product.price}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </MenuItem>
                        ))}
                        <Divider />
                        <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                        <MenuItem onClick={handleGoToCart}>
                            <Button variant="contained" color="primary">
                                Go to Cart
                            </Button>
                        </MenuItem>
                        </Grid>
                        <Grid item xs={6}>
                        <MenuItem onClick={handleCheckout}>
                            <Button variant="contained" color="secondary">
                                Checkout
                            </Button>
                        </MenuItem>
                        </Grid>
                        </Grid>
                    </div>
                ) : (
                    <MenuItem>Your cart is empty</MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default CartDropdown;
