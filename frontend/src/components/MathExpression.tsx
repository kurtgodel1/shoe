import React, { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Update the path as needed

const MathExpression: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const expression = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
        throwOnError: false
    });

    return <div dangerouslySetInnerHTML={{ __html: expression }} />;
};

export default MathExpression;
