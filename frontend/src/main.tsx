import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store'; // Update the path as needed
import { PersistGate } from 'redux-persist/integration/react';
import { persistor} from './store/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Change this to your desired font
        h6: {
            fontFamily: '"Roboto Mono", "Monospace", sans-serif', // Change this to your desired font for h6 elements
        },
    },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
</React.StrictMode>
)