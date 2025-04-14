import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BookTable.css';

const BookTable = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="book-table" ref={sectionRef}>
      
      <div className="book-table-overlay"></div>
      
      <div className='book-table-content'>
        <h2 className="book-table-subtitle">Reserve Your Experience</h2>
        <h1 className="book-table-title">Book A Table</h1>
        
        <p className="book-table-description">
          Secure your spot for an unforgettable dining experience. 
          Whether it's a romantic dinner, family celebration, or business meeting, 
          we'll ensure your time with us is exceptional.
        </p>
        
        <div className="book-table-features">
          <div className="feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Flexible Hours</h3>
              <p>Open 7 days a week, lunch and dinner</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Private Events</h3>
              <p>Special arrangements for groups</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Easy Scheduling</h3>
              <p>Book up to 60 days in advance</p>
            </div>
          </div>
        </div>
        
        <Link to="/table" className="book-now-button">
          Reserve Your Table
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default BookTable;
