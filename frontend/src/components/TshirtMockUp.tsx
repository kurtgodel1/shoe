import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface TshirtMockupProps {
  image: string;
}

const TshirtMockup: React.FC<TshirtMockupProps> = ({ image }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const resizeCanvas = () => {
    if (containerRef.current && canvas) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);

      canvas.getObjects().forEach((obj) => {
        if (obj.type === 'image') {
          obj.scaleToWidth(containerWidth );
          obj.scaleToHeight(containerHeight );
          obj.set({
            left: containerWidth /2,
            top: containerHeight / 2,
          });
        }
      });

      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
      setCanvas(newCanvas);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (canvas) {
        canvas.dispose();
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    fabric.Image.fromURL('/tshirt2.jpg', (tshirtImg) => {
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      if (tshirtImg.width && tshirtImg.height) {
        const scale = Math.min(
          canvasWidth / tshirtImg.width,
          canvasHeight / tshirtImg.height
        );
        tshirtImg.scale(scale);
      }

      tshirtImg.set({ selectable: false });

      fabric.Image.fromURL(image, (productImg) => {
        productImg.scaleToWidth(canvasWidth * 0.4); // Adjust scaling factor as needed
        productImg.scaleToHeight(canvasHeight * 0.4); // Adjust scaling factor as needed
        productImg.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          opacity: 0.8,
        });
        
        canvas.add(new fabric.Group([tshirtImg, productImg], { selectable: false }));
      });
    });

  }, [canvas, image]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TshirtMockup;
