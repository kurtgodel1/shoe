// features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.items.find(item => item.product.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ product: action.payload, quantity: 1 });
        }
      },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
        const item = state.items.find(item => item.product.id === action.payload);
        if (item) {
          item.quantity += 1;
        }
      },
      decreaseQuantity: (state, action: PayloadAction<number>) => {
        const item = state.items.find(item => item.product.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
    // ... other reducers
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
