import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const LatexRenderer = ({ content, displayMode = false }) => {
  return displayMode ? <BlockMath>{content}</BlockMath> : <InlineMath>{content}</InlineMath>;
};

export default LatexRenderer;
