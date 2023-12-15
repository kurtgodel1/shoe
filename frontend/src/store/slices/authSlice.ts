import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  user: any; // Replace 'any' with a more specific type for your user, if available
  token: string | null;
}

// Define the initial state using the AuthState type
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
