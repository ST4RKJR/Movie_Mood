import { useEffect, useRef } from 'react';

const IntersectionObserverComponent = ({ onIntersection }) => {
  const intersectionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 0.5, // 50% of the element must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
              onIntersection(); // Call the provided callback on intersection
              timeoutRef.current = null; // Reset timeout reference
            }, 200);
          }
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear timeout if user scrolls away before 1 second
            timeoutRef.current = null; // Reset timeout reference
          }
        }
      });
    }, options);

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear timeout on unmount
        timeoutRef.current = null; // Reset timeout reference
      }
    };
  }, [onIntersection]);

  return <div ref={intersectionRef} className='w-full text-center text-2xl my-10'>Loading ...</div>;
};

export default IntersectionObserverComponent;
