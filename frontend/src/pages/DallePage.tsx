// HomePage.tsx
import React from 'react';
import { Box } from '@mui/material';
import AnimateOnScroll from '../components/homepage/AnimateOnScroll';
import DalleImageCreator from '../components/homepage/DalleImageCreator';

const DallePage: React.FC = () => {

    return (
        <Box sx={{ flexGrow: 1, width: '100%'  }} className="max-w-full h-auto h-full">
            <AnimateOnScroll className="section"><DalleImageCreator /></AnimateOnScroll>
        </Box>
    );
};

export default DallePage;
