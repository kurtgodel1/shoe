import { useAnimate } from "framer-motion";
import { MouseEventHandler, ReactNode, useRef, TouchEventHandler } from "react";
import { FiMousePointer } from "react-icons/fi";


export const ImageTrail = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration2.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/dancingwoman2.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/fantastichome.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/fantastichome1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/nightsea1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/nightsea2.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/vangogh1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/vangogh2.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang1.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang2.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/mustang3.png",
        "https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration.png",
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-white" style={{ height: '100vh' }}>
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <FiMousePointer />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

interface MouseImageTrailProps {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}: MouseImageTrailProps) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;
    renderNextImage(clientX, clientY);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.touches[0];
    renderNextImage(touch.clientX, touch.clientY);
  };

  const renderNextImage = (x: number, y: number) => {
    const distance = calculateDistance(
      x,
      y,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = x;
      lastRenderPosition.current.y = y;
      renderImage();
    }
  };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector) as HTMLElement;

    const imageWidth = el.offsetWidth / 2;
    const imageHeight = el.offsetHeight / 2;

    el.style.top = `${lastRenderPosition.current.y - imageHeight}px`;
    el.style.left = `${lastRenderPosition.current.x - imageWidth}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(0%, 100%) scale(0.5) ${imageIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`}`,
          `translate(0%, 100%) scale(1) ${imageIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`}`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      {children}
      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};