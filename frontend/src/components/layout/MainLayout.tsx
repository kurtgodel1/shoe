import React, { ReactNode } from 'react';
import { Box, Container, Drawer, List, ListItem, Button, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // Update the path as needed
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons'; // Update the path as needed
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import config from '../../config';
import { Category } from '../../types/types';
import SearchBar from './SearchBar';  // Update the import path as needed


const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const drawerWidth = 240; // or any other value you prefer
    const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);
    const [categories, setCategories] = useState<Category[]>([]);


    const handleSearch = (searchTerm: string) => {
        console.log('Search Term:', searchTerm);
        // Implement the search functionality here
      };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>(`${config.API_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const DrawerContainer = styled(Drawer)(({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: theme.palette.grey[200],
            color: theme.palette.text.primary,
        },
    }));

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 'none',
        borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }));


    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBarStyled position="fixed" sx={{ width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)` }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Ayakkabı
                    </Typography>
                    <SearchBar onSearch={handleSearch} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {!isLoggedIn && (
                            <>
                            <LoginButton />
                            <RegisterButton />
                            </>
                        )}
                        {isLoggedIn && <LogoutButton />}
                    </Box>
                </Toolbar>
            </AppBarStyled>

            <DrawerContainer 
                variant="persistent" 
                open={isDrawerOpen} 
                onClose={toggleDrawer} 
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Box sx={{ width: drawerWidth, overflow: 'auto' }}>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <List>
                        {categories.map(category => (
                            <ListItem key={category.id}>
                                <Button component={Link} to={`/category/${category.id}`}>
                                    {category.name}
                                </Button>
                            </ListItem>
                        ))}
                        {/* More static items */}
                    </List>
                </Box>
            </DrawerContainer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Container>
                <Box component="footer" sx={{ textAlign: 'center', py: 2, mt: 4, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2">© 2023 My Application</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
