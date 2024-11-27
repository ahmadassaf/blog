import { useEffect, useState } from 'react';
import Image from 'next/image';

const ImageFallback = ({
  fallback,
  alt,
  src,
  ...props
}) => {
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setError(null);
  }, [ src ]);

  return (
    <Image
      alt={ alt }
      onError={ setError }
      src={ error ? fallback : src }
      { ...props }
    />
  );
};

export default ImageFallback;
