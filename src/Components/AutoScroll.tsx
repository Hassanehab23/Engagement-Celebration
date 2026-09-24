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
  loop = true,
}: AutoScrollProps): null {
  const intervalRef = useRef<number | null>(null);
  const isStoppedManually = useRef(false);

  useEffect(() => {
    if (!active) return;
    window.scrollTo(0, 0);
    isStoppedManually.current = false;
  }, [active]);

  useEffect(() => {
    if (!active || sectionIds.length === 0) return;

    let currentSectionIndex = 0;
    let paused = false;

    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // دالة إيقاف السكرول التلقائي فور لمس الشاشة أو تحريك الماوس
    const handleUserInteraction = () => {
      isStoppedManually.current = true;
      stop();
    };

    // ربط أحداث تفاعل المستخدم
    const events: Array<keyof WindowEventMap> = [
      'wheel',
      'touchstart',
      'pointerdown',
      'keydown',
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, handleUserInteraction, { passive: true });
    });

    intervalRef.current = window.setInterval(() => {
      if (paused || isStoppedManually.current) return;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // لو وصل لنهاية الصفحة
      if (window.scrollY >= maxScroll - 5) {
        if (!loop) {
          stop();
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentSectionIndex = 0;
        paused = true;
        setTimeout(() => {
          if (!isStoppedManually.current) {
            paused = false;
          }
        }, delayMs);
        return;
      }

      if (currentSectionIndex >= sectionIds.length) return;

      const currentId = sectionIds[currentSectionIndex];
      const section = document.getElementById(currentId);

      if (!section) {
        currentSectionIndex++;
        return;
      }

      const rect = section.getBoundingClientRect();

      // أول ما بداية السكشن تقرب من أول الشاشة، نقف 5 ثواني
      if (rect.top <= 5 && rect.top >= -5) {
        paused = true;

        setTimeout(() => {
          if (!isStoppedManually.current) {
            paused = false;
            currentSectionIndex++;
          }
        }, delayMs);
        return;
      }

      // النزول التدريجي السريع والسلِس
      window.scrollBy(0, 5);
    }, 16);

    return () => {
      stop();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleUserInteraction);
      });
    };
  }, [active, sectionIds, delayMs, loop]);

  return null;
}
