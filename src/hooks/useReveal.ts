import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to an element when it scrolls into view.
 * Use with the `reveal` class for fade-up-on-scroll animations.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe the element itself and any children with .reveal
    if (el.classList.contains('reveal')) observer.observe(el);
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}
