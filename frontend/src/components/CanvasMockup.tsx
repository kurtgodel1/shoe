import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface CanvasMockupProps {
  image: string;
}

const CanvasMockup: React.FC<CanvasMockupProps> = ({ image }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
      setCanvas(newCanvas);
    }

    return () => {
      if (canvas) {
        canvas.clear();
      }
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    fabric.Image.fromURL('/canvas.jpg', (canvasImg) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      canvasImg.scaleToWidth(canvasWidth);
      canvasImg.scaleToHeight(canvasHeight);
      canvas.add(canvasImg);
      canvasImg.set({ selectable: false });

      fabric.Image.fromURL(image, (productImg) => {
        productImg.scaleToWidth(canvasWidth * 0.4); // Adjust scaling factor as needed
        productImg.scaleToHeight(canvasHeight * 0.4); // Adjust scaling factor as needed
        productImg.set({
          left: canvasWidth / 1.55,
          top: canvasHeight / 1.9,
          originX: 'center',
          originY: 'center'
        });
        canvas.add(productImg);
      });
    });

    canvas.renderAll();

  }, [canvas, image]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasMockup;
