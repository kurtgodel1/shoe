import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

function MathExpression() {
    const expression = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
        throwOnError: false
    });

    return <div dangerouslySetInnerHTML={{ __html: expression }} />;
}

export default MathExpression;
