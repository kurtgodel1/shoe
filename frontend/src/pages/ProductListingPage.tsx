import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography} from '@mui/material';
import { Product } from '../types/types';
import ImageSlider from '../components/ImageSlider';
import config from '../config';
import CategoryFilter from '../components/CategoryFilter';
import ImageSliderSkeleton from '../components/ImageSliderSkeleton'; // Import the skeleton component



const ProductListingPage: React.FC = () => {
    const [productGroups, setProductGroups] = useState<Product[][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const limit: number = 4;
    const observer = useRef<IntersectionObserver | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('');


    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(prevOffset => prevOffset + limit);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    
    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted
        const fetchProducts = async () => {
            if (!isMounted) return; // Prevent fetch if component is unmounted
            setLoading(true);
            try {
                let url = `${config.API_URL}/api/products`;
                if (selectedCategory) {
                    url += `?category=${selectedCategory}`;
                }
                const response = await axios.get(url, { params: { limit, offset } });
                if (isMounted) {
                    setProductGroups(prev => offset === 0 && prev.length === 0 ? [response.data.results] : [...prev, response.data.results]);
                    setHasMore(response.data.results.length === limit);
                }
            } catch (error) {
                if (isMounted) console.error('Error fetching products', error);
                setHasMore(false);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();
        return () => { isMounted = false; }; // Cleanup function to toggle the flag when component unmounts
    }, [offset, selectedCategory]);

    useEffect(() => {
        // Set the initial offset to 0 for the first fetch
        setOffset(0);
    }, []);

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
        setOffset(0);
        setHasMore(true);
        setProductGroups([]);
        setLoading(true);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <CategoryFilter onFilterChange={handleFilterChange} />
            <Typography variant="h4" sx={{ margin: 2 }}>
                Products
            </Typography>
            {productGroups.map((group, index) => (
                <ImageSlider key={index} products={group} />
            ))}
            <div ref={lastElementRef} />
            {loading && <ImageSliderSkeleton />}
        </Box>
    );
};

export default ProductListingPage;
