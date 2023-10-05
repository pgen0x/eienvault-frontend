import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { JazzIcon } from '../jazzicon';

export const ImageWithFallback = ({
  address,
  alt,
  src: initialSrc,
  diameter,
  ...props
}) => {
  const [isValidImage, setIsValidImage] = useState(true);
  const src = initialSrc || ''; // Provide a default value for src

  useEffect(() => {
    if (src) {
      // Check if the file extension indicates an image
      const fileExtension = src.split('.').pop().toLowerCase();
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']; // Add more if needed

      if (!validExtensions.includes(fileExtension)) {
        setIsValidImage(false);
      }
    }
  }, [src]);

  if (!isValidImage) {
    return (
      <JazzIcon diameter={diameter} seed={address} useGradientFallback={true} {...props} />
    );
  }

  return (
    <Image
      alt={alt}
      src={src}
      placeholder="blur"
      blurDataURL={src}
      {...props}
    />
  );
};
