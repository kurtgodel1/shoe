import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from 'react';
import './ShuffleHero.css'
import { useNavigate } from 'react-router-dom';


const ShuffleHero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products'); // Adjust the route as needed
  };

  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Unveiling AI Artistry
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          A Fusion of Technology and Creativity
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Discover a world where art meets artificial intelligence. Each piece in our collection 
          is a unique expression, birthed from advanced algorithms and the touch of digital mastery.
          Dive into the vivid imaginations of AI and find artwork that resonates with your space and spirit.
        </p>
        <button onClick={handleExploreClick} className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Explore the Gallery
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};


const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
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


interface SquareData {
  id: number;
  src: string;
}

const generateSquares = (data: SquareData[]) => {
  return data.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="gridItem" // Add a class for styling
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center" // Ensure image is centered
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const isMobile = useIsMobile();
  const timeoutRef = useRef<number | undefined>(undefined);
  const [squares, setSquares] = useState<JSX.Element[]>([]);
  const shuffleSquares = useCallback(() => {
    const scrollY = window.scrollY; // Save current scroll position

    // Shuffle and adjust the number of squares based on the device type

    let shuffledData;

    if (isMobile){
       shuffledData = shuffle(squareData.slice(0, 4));
    } else {
       shuffledData = shuffle(squareData);
    }
    const displayedData = isMobile ? shuffledData.slice(0, 4) : shuffledData; // Only 4 images for mobile

    setSquares(generateSquares(displayedData));

    // Restore the scroll position after the shuffle
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });

    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  }, [isMobile]); // Depend on isMobile to re-create the shuffle function when device type changes

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, [shuffleSquares]);

  return (
    <div className="shuffleGrid">
      {squares}
    </div>
  );
};


export default ShuffleHero;