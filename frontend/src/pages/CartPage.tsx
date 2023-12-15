// CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/slices/cartSlice'; // Update the import path as needed
import { CartItem } from '../types/types';

const CartPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleCheckout = () => {
        // Logic for checkout
    };

    const calculateTotal = (items: CartItem[]) => 
        items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={2}>
                {cartItems.map(item => (
                    <Grid item xs={12} key={item.product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{item.product.name}</Typography>
                                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                <Typography variant="body2">Price: ${item.product.price}</Typography>
                                <Typography variant="body2">
                                    Total: ${item.quantity * item.product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => handleRemoveFromCart(item.product.id)}>
                                    Remove from Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {cartItems.length > 0 ? (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">
                        Total: ${calculateTotal(cartItems)}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleCheckout}>
                        Proceed to Checkout
                    </Button>
                </Box>
            ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
            )}
        </Box>
    );
};

export default CartPage;
