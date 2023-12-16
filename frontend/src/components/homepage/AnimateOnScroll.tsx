// AnimateOnScroll.js or AnimateOnScroll.tsx
import React from 'react';
import { useInView } from 'react-intersection-observer';
import './AnimateOnScroll.css'; // Create this CSS file for animations

const AnimateOnScroll = ({ children }) => {
    const { ref, inView } = useInView({
        threshold: 0, // Adjust this value as needed
        triggerOnce: false, // Change to false if you want the animation every time it comes into view
    });

    return (
        <div ref={ref} className={`animate-on-scroll ${inView ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

export default AnimateOnScroll;
