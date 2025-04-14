import React, { useState, useEffect, useRef } from 'react'
import './Section4.css'
import { Link } from 'react-router-dom'

// High-quality food images
const foodItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken pieces marinated in yogurt and spices, then cooked in a rich, creamy tomato sauce with butter and aromatic spices. Served with naan bread and basmati rice.",
    price: "$16.99",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Signature Biryani",
    description: "Our aromatic rice dish cooked with tender meat, fragrant spices, and caramelized onions. Layered with saffron-infused rice and garnished with fresh herbs. Served with raita and salan.",
    price: "$18.99",
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries. A perfect balance of rich chocolate and sweet cream.",
    price: "$8.99",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=1374&auto=format&fit=crop"
  }
];

const Section4 = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When section comes into view, start revealing items one by one
          const timer = setTimeout(() => {
            setVisibleItems([0]);

            const timers = foodItems.slice(1).map((_, index) => {
              return setTimeout(() => {
                setVisibleItems(prev => [...prev, index + 1]);
              }, (index + 1) * 400); // Stagger the animations
            });

            return () => {
              timers.forEach(t => clearTimeout(t));
              clearTimeout(timer);
            };
          }, 300);
        }
      },
      { threshold: 0.1 }
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

  return (
    <section className="newest-items" ref={sectionRef}>
      {/* Background elements */}
      <div className="bg-pattern"></div>
      <div className="bg-accent accent-1"></div>
      <div className="bg-accent accent-2"></div>

      <div className="newest-items-container">
        <div className="newest-items-header">
          <h2 className="newest-items-subtitle">Discover</h2>
          <h1 className="newest-items-title">Our Newest Creations</h1>
          <p className="newest-items-description">
            Experience our chef's latest culinary innovations, crafted with seasonal ingredients and creative techniques.
          </p>
        </div>

        {foodItems.map((item, index) => (
          <div
            key={item.id}
            className={`item-row ${visibleItems.includes(index) ? 'visible' : ''}`}
            ref={el => itemRefs.current[index] = el}
          >
            <div className="item-image-container">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />
            </div>

            <div className="item-content">
              <span className="item-tag">{item.category}</span>
              <h3 className="item-title">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-price">{item.price}</div>
              <button className="order-button">
                Order Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="view-all-container">
          <Link to="/menu" className="view-all-button">
            View All Menu Items
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Section4