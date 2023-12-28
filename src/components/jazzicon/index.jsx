import jazzicon from '@metamask/jazzicon';
import { useEffect, useRef } from 'react';
import color from 'tinycolor2';

export function JazzIcon({ diameter, seed, useGradientFallback, ...props }) {
  const ref = useRef(null);
  const { className, ...otherProps } = props;

  useEffect(() => {
    if (ref?.current) {
      if (useGradientFallback) {
        // Generate and set a consistent gradient image as a fallback
        const gradientImage = generateConsistentGradient(diameter, seed);
        ref.current.style.backgroundImage = `url(${gradientImage})`;
      } else {
        // Clear any previous background image
        ref.current.style.backgroundImage = 'none';

        // Generate the jazzicon image
        const icon = jazzicon(diameter, seed);
        ref.current.replaceChildren(icon);
      }
    }
  }, [diameter, seed, useGradientFallback]);

  // Function to generate a consistent three-color gradient image based on seed
  const generateConsistentGradient = (size, seed) => {
    // Generate colors based on the seed with increased saturation and lightness
    const n = seed;
    const c1 = color({ h: n % 360, s: 0.95, l: 0.5 });
    const c2 = c1.triad()[1];

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Create a gradient based on the three colors with adjusted color stops
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0.2, c1.toHexString()); // Start with color c1
    gradient.addColorStop(0.9, c2.toHexString()); // Middle color c2

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return canvas.toDataURL('image/png');
  };

  // Function to generate a color based on seed, index, saturation, and lightness
  const generateColor = (
    seed = 0,
    index = 0,
    saturation = 50,
    lightness = 50,
  ) => {
    const hue = (seed * 1000 + index * 100) % 360; // Use the seed to generate hue
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div
      ref={ref}
      className={`flex justify-center rounded-full border-solid border-white ${className}`}
      style={{ width: diameter, height: diameter }}
      {...otherProps}
    ></div>
  );
}
