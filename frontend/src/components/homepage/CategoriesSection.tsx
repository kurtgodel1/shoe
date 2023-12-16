// CategoriesSection.tsx
import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Category } from '../../types/types';
import axios from 'axios';
import config from '../../config';
import { useState, useEffect } from 'react';


const CategoriesSection : React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Example API calls, replace with your actual API endpoints
        axios.get<Category[]>(`${config.API_URL}/api/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);


    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>
                Shop by Category
            </Typography>
            <Grid container spacing={4}>
                {categories.map(category => (
                    <Grid item key={category.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={category.image}
                                    alt={category.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {category.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CategoriesSection;
