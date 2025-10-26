import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

interface SwipeBackOptions {
  threshold?: number;
  velocity?: number;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

export function useSwipeBack(options: SwipeBackOptions = {}) {
  const [, setLocation] = useLocation();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwiping = useRef(false);
  const swipeElement = useRef<HTMLElement | null>(null);

  const threshold = options.threshold || 100;
  const velocityThreshold = options.velocity || 0.3;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchCurrentX.current = touch.clientX;

      // Only start swipe from left edge (first 50px)
      if (touchStartX.current < 50) {
        isSwiping.current = true;
        options.onSwipeStart?.();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const touch = e.touches[0];
      touchCurrentX.current = touch.clientX;
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);

      // Only allow horizontal swipe (not vertical scroll)
      if (deltaX > 10 && deltaY < 50) {
        e.preventDefault();

        // Apply transform to show swipe feedback
        if (swipeElement.current && deltaX > 0) {
          const progress = Math.min(deltaX / 300, 1);
          swipeElement.current.style.transform = `translateX(${deltaX}px)`;
          swipeElement.current.style.opacity = `${1 - progress * 0.3}`;
        }
      } else if (deltaY > 20) {
        // If user is scrolling vertically, cancel swipe
        isSwiping.current = false;
        if (swipeElement.current) {
          swipeElement.current.style.transform = '';
          swipeElement.current.style.opacity = '';
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const deltaX = touchCurrentX.current - touchStartX.current;
      const shouldNavigateBack = deltaX > threshold;

      // Reset element style
      if (swipeElement.current) {
        swipeElement.current.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        swipeElement.current.style.transform = '';
        swipeElement.current.style.opacity = '';

        setTimeout(() => {
          if (swipeElement.current) {
            swipeElement.current.style.transition = '';
          }
        }, 300);
      }

      if (shouldNavigateBack) {
        // Navigate back
        window.history.back();
        options.onSwipeEnd?.();
      }

      isSwiping.current = false;
    };

    // Find the main content element
    swipeElement.current = document.querySelector('main') as HTMLElement;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold, velocityThreshold, options.onSwipeStart, options.onSwipeEnd]);

  return { isSwiping: isSwiping.current };
}
