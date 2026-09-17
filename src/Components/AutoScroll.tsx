import { useEffect, useRef } from 'react';

interface AutoScrollProps {
  active: boolean;
  sectionIds: string[];
  delayMs?: number;
  loop?: boolean;
}

export default function AutoScroll({
  active,
  sectionIds,
  delayMs = 5000,
  loop = false,
}: AutoScrollProps): null {
  const timerRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!active || sectionIds.length < 2) {
      return undefined;
    }

    currentIndexRef.current = 0;
    pausedRef.current = false;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const pause = () => {
      pausedRef.current = true;
      clearTimer();
    };

    const scrollToNextSection = () => {
      if (pausedRef.current) {
        return;
      }

      const nextIndex = currentIndexRef.current + 1;

      if (nextIndex >= sectionIds.length) {
        if (!loop) {
          clearTimer();
          return;
        }

        currentIndexRef.current = 0;
      } else {
        currentIndexRef.current = nextIndex;
      }

      const nextSection = document.getElementById(
        sectionIds[currentIndexRef.current]
      );

      if (nextSection) {
        const sectionTop =
          nextSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth',
        });
      }

      timerRef.current = window.setTimeout(
        scrollToNextSection,
        delayMs
      );
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'wheel',
      'touchstart',
      'pointerdown',
      'keydown',
    ];

    interactionEvents.forEach(eventName => {
      window.addEventListener(eventName, pause, {
        passive: true,
      });
    });

    timerRef.current = window.setTimeout(
      scrollToNextSection,
      delayMs
    );

    return () => {
      clearTimer();

      interactionEvents.forEach(eventName => {
        window.removeEventListener(eventName, pause);
      });
    };
  }, [active, delayMs, loop, sectionIds]);

  return null;
}
