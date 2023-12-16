// ExclusiveEditions.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../ProductCard'; // Update the import path as needed
import { Product } from '../../types/types';

const ExclusiveEditions : React.FC = () => {
    const [exclusiveProducts, setExclusiveProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch exclusive products from an API or define them here
        const fetchExclusiveProducts = async () => {
            // Example: const response = await fetch('/api/exclusive-products');
            // setExclusiveProducts(response.data);
            // For now, we will use dummy data
            setExclusiveProducts([
                { id: 1, name: 'Exclusive Product 1', imageUrl: 'path_to_image', description: 'Description 1', price: 150 },
                // Add more exclusive products as needed
            ]);
        };

        fetchExclusiveProducts();
    }, []);

    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Exclusive Editions
            </Typography>
            <Grid container spacing={4}>
                {exclusiveProducts.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ExclusiveEditions;
