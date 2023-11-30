import React from 'react';
import LatexRenderer from './LatexRenderer';

const ExampleComponent: React.FC = () => {
  return (
    <div>
      <p>This is an inline equation: <LatexRenderer content="E = mc^2" /></p>
      <p>And here's a block equation:</p>
      <LatexRenderer content="\int_0^\infty e^{-x^2} dx=\frac{\sqrt{\pi}}{2}" displayMode={true} />
    </div>
  );
};

export default ExampleComponent;
