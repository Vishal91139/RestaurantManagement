import React, { useEffect, useRef } from 'react'
import TableLayout from '../Components/TableLayout/TableLayout'
import { gsap } from 'gsap'
import './TablePage.css'

const Tablepage = () => {
  // Create refs for GSAP animations
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  // Initialize GSAP animations when component mounts
  useEffect(() => {
    if (containerRef.current && headerRef.current && contentRef.current) {
      // Animate container
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );

      // Animate header
      gsap.fromTo(headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
      );

      // Animate content
      gsap.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.4 }
      );
    }
  }, []);

  return (
    <div className="table-page-container" ref={containerRef}>
      <div className="table-header" ref={headerRef}>
        <h1 className="table-title fade-in">Table Overview</h1>
        <h2 className="table-subtitle slide-up">A Culinary Journey Awaits!</h2>
      </div>

      <div className="table-content" ref={contentRef}>
        <TableLayout />
      </div>
    </div>
  )
}

export default Tablepage