// CheckoutPage.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, List, ListItem, Divider } from '@mui/material';
import { RootState } from '../store/store'; // Update the path as needed
import { CartItem } from '../types/types';

const CheckoutPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [address, setAddress] = useState('');
    const [creditCard, setCreditCard] = useState('');

    const calculateTotal = (items: CartItem[]) =>
        items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle checkout process
        console.log('Submitting order with address:', address, 'and credit card:', creditCard);
        // Redirect to success page, clear cart, etc.
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Checkout</Typography>

            <List>
                {cartItems.map(item => (
                    <ListItem key={item.product.id}>
                        <Typography>
                            {item.product.name} - {item.quantity} x ${item.product.price}
                        </Typography>
                    </ListItem>
                ))}
                <Divider />
                <ListItem>
                    <Typography>Total: ${calculateTotal(cartItems)}</Typography>
                </ListItem>
            </List>

            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Shipping Address" 
                    fullWidth 
                    margin="normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField 
                    label="Credit Card Number" 
                    fullWidth 
                    margin="normal"
                    value={creditCard}
                    onChange={(e) => setCreditCard(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Place Order
                </Button>
            </form>
        </Box>
    );
};

export default CheckoutPage;
