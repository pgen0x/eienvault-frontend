import React, { useEffect, useRef } from 'react';
import jazzicon from '@metamask/jazzicon';

export function JazzIcon({ diameter, seed }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref?.current) {
      const icon = jazzicon(diameter, seed);
      ref.current.replaceChildren(icon);
    }
  }, [diameter, seed]);

  return (
    <div
      ref={ref}
      className="border-1 flex justify-center rounded-full border-solid border-white "
    ></div>
  );
}
