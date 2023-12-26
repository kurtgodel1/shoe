import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {Category} from "../types/types";
import { Card, CardActionArea, CardMedia } from "@mui/material";


interface TiltCardProps {
    category: Category;
  }


const TiltCard: React.FC<TiltCardProps> = ({ category }) => {
    const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCategoryClick = () => {
    navigate('/products', { state: { category: category.name } });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCategoryClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-100"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center"
        >
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-center text-2xl font-bold"
        >
          {category.name}
        </p>
      <Card>
        <CardActionArea >
             <CardMedia
                 component="img"
                 height="250"
                 image={category.image}
                 alt={category.name}
             />
         </CardActionArea>
        </Card>
      </div>
    </motion.div>
  );
};

export default TiltCard;