
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileOptimizedCard = ({ children, className }: MobileOptimizedCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden shadow-soft hover:shadow-glow transition-shadow duration-300",
      "touch-manipulation", // Optimizes for touch
      className
    )}>
      {children}
    </Card>
  );
};

interface MobileTouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const MobileTouchButton = ({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'default',
  className,
  disabled
}: MobileTouchButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        // Minimum touch target size (44px)
        "min-h-[44px] min-w-[44px] touch-manipulation",
        // Better spacing for fingers
        "px-6 py-3 text-base font-medium",
        // Enhanced touch feedback
        "active:scale-95 transition-transform duration-150",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </Button>
  );
};
