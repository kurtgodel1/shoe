import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Product } from '../types/types';
import axios from 'axios';
import config from '../config';

const TshirtMockup = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get<Product>(`${config.API_URL}/api/products/1`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.error('Error fetching product details', error));
  }, []);

  useEffect(() => {
    if (product && product.images) {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;

      const canvas = new fabric.Canvas(canvasElement);

      fabric.Image.fromURL('/tshirt.png', (tshirtImg) => {
        // Ensure canvas dimensions are defined
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        tshirtImg.scaleToWidth(canvasWidth);
        tshirtImg.scaleToHeight(canvasHeight);
        canvas.add(tshirtImg);
        tshirtImg.set({ selectable: false });

        product.images.forEach((image) => {
          fabric.Image.fromURL(image.image, (productImg) => {
            productImg.scaleToWidth(200); // Adjust as needed
            productImg.scaleToHeight(200); // Adjust as needed
            productImg.set({
              left: canvasWidth / 2,
              top: canvasHeight / 2,
              originX: 'center',
              originY: 'center'
            });
            canvas.add(productImg);
          });
        });
      });

      // Update the canvas rendering
      canvas.renderAll();

      // Clean up
      return () => {
        canvas.dispose();
      };
    }
  }, [product]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
};

export default TshirtMockup;
