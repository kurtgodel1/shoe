// CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/slices/cartSlice'; // Update the import path as needed
import { CartItem } from '../types/types';
import { increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice'; // Update the import path as needed
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const CartPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrease = (productId: number) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecrease = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleCheckout = () => {
        navigate('/checkout');
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
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={12} md={3}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                      <img src={item.product.images?.[0].image} alt={item.product.name} style={{ width: '50%' }} />
                    </Box>
                  </Grid>

                  {/* Product Info */}
                  <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                      <Typography variant="h5">{item.product.name}</Typography>
                      <Typography variant="body2">Price: ${item.product.price}</Typography>
                    </Box>
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={12} md={2}>
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                      <IconButton onClick={() => handleDecrease(item.product.id)} color="primary">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item.product.id)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Subtotal */}
                  <Grid item xs={12} md={3}>
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                      <Typography variant="h5">
                         ${item.quantity * item.product.price}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Remove Button */}
                  <Grid item xs={12} md={1}>
                    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                      <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.product.id)}>
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
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
