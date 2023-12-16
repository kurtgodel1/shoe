// FeaturedProducts.tsx
import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../ProductCard'; // Update the import path as needed
import { Product} from '../../types/types';
import axios from 'axios';
import config from '../../config';

const FeaturedProducts : React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Product[]>(`${config.API_URL}/api/products`)
            .then(response => setFeaturedProducts(response.data))
            .catch(error => console.error('Error fetching featured products', error));

    }, []);

    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Featured Products
            </Typography>
            <Grid container spacing={4}>
                {featuredProducts.map(product => (
                    
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default FeaturedProducts;
