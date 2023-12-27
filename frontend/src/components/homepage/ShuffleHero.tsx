import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from 'react';

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Let's change it up a bit
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Find a class
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png",
  },
  {
    id: 2,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman.png",
  },
  {
    id: 3,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman2.png",
  },
  {
    id: 4,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration2.png",
  },
  {
    id: 5,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/fantastichome.png",
  },
  {
    id: 6,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/fantastichome2.png",
  },
  {
    id: 7,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang.png",
  },
  {
    id: 8,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang2.png",
  },
  {
    id: 9,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/nightsea1.png",
  },
  {
    id: 10,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/nightsea2.png",
  },
  {
    id: 11,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/vangogh1.png",
  },
  {
    id: 12,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/vangogh2.png",
  },
  {
    id: 13,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang6.png",
  },
  {
    id: 14,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration4.png",
  },
  {
    id: 15,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman1.png",
  },
  {
    id: 16,
    src: "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman3.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
    const timeoutRef = useRef<number | undefined>(undefined);
    const [squares, setSquares] = useState(generateSquares());

    const shuffleSquares = useCallback(() => {
      const scrollY = window.scrollY; // Save current scroll position

        setSquares(generateSquares());
      
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });

        timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
      }, []);

  useEffect(() => {
    shuffleSquares();
  
    return () => clearTimeout(timeoutRef.current);
  }, [shuffleSquares]);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;