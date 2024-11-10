import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  let locoScroll;

  useEffect(() => {
    // Initialize Locomotive Scroll
    locoScroll = new LocomotiveScroll({
      el: scrollRef.current, // Target the element with the ref
      smooth: true, // Enable smooth scrolling
    });

    // Update locomotive scroll on window resize
    const onResize = () => locoScroll.update();
    window.addEventListener('resize', onResize);

    return () => {
      // Destroy Locomotive Scroll instance when the component unmounts
      if (locoScroll) locoScroll.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      id="scroll-container"
      data-scroll-container
      ref={scrollRef}
      style={{ height: '100%', overflow: 'hidden' }} // Ensure proper height and overflow settings
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
