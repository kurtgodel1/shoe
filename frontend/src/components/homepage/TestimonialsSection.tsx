// TestimonialsSection.tsx
import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const TestimonialsSection: React.FC = () =>  {
    const testimonials = [
        // Array of testimonials. Replace with real data.
        { id: 1, author: "Jane Doe", text: "Love these pics! Lovely and colorful!" },
        // More testimonials...
    ];

    return (
        <div>
            <Typography variant="h4" sx={{ margin: 2 }}>What Our Customers Say</Typography>
            <Grid container spacing={2}>
                {testimonials.map(testimonial => (
                    <Grid item key={testimonial.id} xs={12} sm={12}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="body1">"{testimonial.text}"</Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                - {testimonial.author}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TestimonialsSection;
