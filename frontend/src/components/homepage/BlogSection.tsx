// BlogSection.tsx
import React from 'react';
import { Typography, Link } from '@mui/material';

const BlogSection: React.FC = () => {
    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>From Our Blog</Typography>
            <Link href="/blog" sx={{ textDecoration: 'none' }}>View All Articles</Link>
            {/* Display a few blog post summaries here */}
        </div>
    );
};

export default BlogSection;
