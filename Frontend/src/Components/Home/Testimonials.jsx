import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

import customerImage1 from '../../assets/Icons/userIcon.svg';
import customerImage2 from '../../assets/Icons/userIcon.svg';
import customerImage3 from '../../assets/Icons/userIcon.svg';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Critic",
      image: customerImage1,
      quote: "An extraordinary culinary journey that delights all the senses. The attention to detail in every dish is remarkable, and the service is impeccable. Easily one of the best dining experiences I've had in years.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      image: customerImage2,
      quote: "I've been coming here for over two years, and the quality and creativity never cease to amaze me. The seasonal menu always offers something new to discover, while keeping the classics that I've come to love.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Food Blogger",
      image: customerImage3,
      quote: "From the moment you step in, you're transported to a world of culinary excellence. The ambiance perfectly complements the exquisite food. A must-visit for anyone who appreciates fine dining with a creative twist.",
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          nextTestimonial();
        }
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isAnimating]);

  const nextTestimonial = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const goToTestimonial = (index) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <section className="testimonials " ref={sectionRef}>
      <div className="testimonials-container ">
        <div className="testimonials-header">
          <h2 className="testimonials-subtitle">What Our Guests Say</h2>
          <h1 className="testimonials-title">Customer Testimonials</h1>
        </div>

        <div className="testimonials-carousel">
          <div className="testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="testimonial-quote">{testimonial.quote}</p>

                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h3 className="author-name">{testimonial.name}</h3>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="testimonial-arrow prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="testimonial-arrow next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="testimonials-background">
        <div className="bg-pattern"></div>
        <div className="bg-accent accent-1"></div>
        <div className="bg-accent accent-2"></div>
      </div>
    </section>
  );
};

export default Testimonials;
