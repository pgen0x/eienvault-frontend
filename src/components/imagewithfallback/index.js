import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { JazzIcon } from '../jazzicon';

export const ImageWithFallback = ({ address, alt, src, diameter, ...props }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return error ? (
    <JazzIcon diameter={diameter} seed={address} useGradientFallback={true} />
  ) : (
    <Image alt={alt} onError={setError} src={src} {...props} />
  );
};
