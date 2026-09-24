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

  useEffect(() => {
    if (!active) return;
    window.scrollTo(0, 0);
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

    intervalRef.current = window.setInterval(() => {
      if (paused) return;

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
          paused = false;
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

      // القياس المباشر لمكان السكشن بالنسبة لشاشة العرض
      const rect = section.getBoundingClientRect();

      // أول ما بداية السكشن تقرب من أول الشاشة (تصبح عند صفر أو أقل بقليل)، نقف فوراً
      if (rect.top <= 5 && rect.top >= -5) {
        paused = true;

        setTimeout(() => {
          paused = false;
          currentSectionIndex++;
        }, delayMs);
        return;
      }

      // النزول التدريجي السريع والسلِس
      window.scrollBy(0, 5);
    }, 16);

    return () => {
      stop();
    };
  }, [active, sectionIds, delayMs, loop]);

  return null;
}
