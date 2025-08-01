
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  placeholder?: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export const ProgressiveImage = ({ 
  src, 
  placeholder = '/placeholder.svg', 
  alt, 
  className,
  onLoad 
}: ProgressiveImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };
  }, [src, onLoad]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading="lazy"
      />
      {!imageLoaded && (
        <div className={cn(
          "absolute inset-0 bg-muted animate-pulse",
          "flex items-center justify-center text-muted-foreground"
        )}>
          <div className="text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};
