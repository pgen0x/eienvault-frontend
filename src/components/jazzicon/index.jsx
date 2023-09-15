import jazzicon from '@metamask/jazzicon';
import React, { useEffect, useRef } from 'react';

export function JazzIcon({ diameter, seed, useGradientFallback }) {
  const ref = useRef(null);

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

  // Function to generate a consistent gradient image based on seed
  const generateConsistentGradient = (size, seed) => {
    // Generate colors based on the seed with increased saturation and lightness
    const color1 = generateColor(seed, 0, 90, 50); // Increase saturation and lightness
    const color2 = generateColor(seed, 1, 10, 80); // Increase saturation and lightness

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Create a gradient based on the colors with adjusted color stops
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0.2, color1); // Adjust the position of the first color
    gradient.addColorStop(0.8, color2); // Adjust the position of the second color

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return canvas.toDataURL('image/png');
  };

  // Function to generate a color based on seed, index, saturation, and lightness
  const generateColor = (seed = 0, index = 0, saturation = 50, lightness = 50) => {
    const hue = (seed * 1000 + index * 100) % 360; // Use the seed to generate hue
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div
      ref={ref}
      className="flex justify-center rounded-full border-solid border-white"
      style={{ width: diameter, height: diameter }}
    ></div>
  );
}
