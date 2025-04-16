import React, { useEffect, useRef, useState } from "react";
import { slider } from "../../DB/MenuDB";
import "./Section3Styles.css";

const Section3 = () => {
  const [activeSection, setActiveSection] = useState(slider[0].section_name);
  const [currentIndex, setCurrentIndex] = useState(0);
  const menuRefs = useRef([]);
  const menuItemRefs = useRef([]);
  const textScrollRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const hasInteracted = useRef(false);

  // Handle scroll for category slider
  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleScroll = debounce(() => {
      const scrollContainer = textScrollRef.current;
      if (!scrollContainer) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestSection = null;
      let closestDistance = Infinity;

      menuRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.left + rect.width / 2;
          const distance = Math.abs(elementCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = slider[index].section_name;
          }
        }
      });

      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
        setCurrentIndex(0);
        hasInteracted.current = true;
      }
    }, 100);

    const scrollContainer = textScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeSection]);

  // Handle scroll for menu items slider
  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleItemScroll = debounce(() => {
      const sliderContainer = sliderContainerRef.current;
      if (!sliderContainer) return;

      const containerRect = sliderContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestItemIndex = 0;
      let closestDistance = Infinity;

      menuItemRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.left + rect.width / 2;
          const distance = Math.abs(elementCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestItemIndex = index;
          }
        }
      });

      if (closestItemIndex !== currentIndex) {
        setCurrentIndex(closestItemIndex);
        hasInteracted.current = true;
      }
    }, 100);

    const sliderContainer = sliderContainerRef.current;
    if (sliderContainer) {
      sliderContainer.addEventListener('scroll', handleItemScroll);
    }

    return () => {
      if (sliderContainer) {
        sliderContainer.removeEventListener('scroll', handleItemScroll);
      }
    };
  }, [currentIndex]);

  // Scroll to active category
  useEffect(() => {
    if (!hasInteracted.current) return;

    const activeIndex = slider.findIndex((item) => item.section_name === activeSection);
    if (menuRefs.current[activeIndex]) {
      menuRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  // Center active menu item
  useEffect(() => {
    if (!hasInteracted.current) return;

    // Add a small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      if (menuItemRefs.current[currentIndex]) {
        menuItemRefs.current[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Prevent vertical scroll
          inline: "center", // Only horizontal scroll
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const scrollToNext = () => {
    const activeSectionData = slider.find((section) => section.section_name === activeSection);
    const itemCount = activeSectionData.items.length;

    // Implement infinite scrolling
    const nextIndex = (currentIndex + 1) % itemCount;
    setCurrentIndex(nextIndex);

    // Smooth scroll with a slight delay for better transition
    setTimeout(() => {
      menuItemRefs.current[nextIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }, 50);

    hasInteracted.current = true;
  };

  const scrollToPrev = () => {
    const activeSectionData = slider.find((section) => section.section_name === activeSection);
    const itemCount = activeSectionData.items.length;

    // Implement infinite scrolling
    const prevIndex = (currentIndex - 1 + itemCount) % itemCount;
    setCurrentIndex(prevIndex);

    // Smooth scroll with a slight delay for better transition
    setTimeout(() => {
      menuItemRefs.current[prevIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }, 50);

    hasInteracted.current = true;
  };

  const handleCategoryClick = (sectionName) => {
    setActiveSection(sectionName);
    setCurrentIndex(0);
    hasInteracted.current = true;
  };

  const handleItemClick = (index) => {
    setCurrentIndex(index);

    // Ensure proper scrolling to the clicked item
    setTimeout(() => {
      menuItemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }, 50);

    hasInteracted.current = true;
  };

  const activeSectionData = slider.find((section) => section.section_name === activeSection);
  const backgroundImage = activeSectionData.image || "";

  return (
    <div
      className="h-screen bg-amber-100 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated headline with interesting typography */}
      <div className="absolute top-10 left-10 z-20 headline-container">
        <h2 className="text-white text-4xl font-extrabold tracking-wider headline-text">
          <span className="text-amber-400">Featured</span> Menu
        </h2>
        <div className="headline-underline"></div>
        <p className="headline-subtitle mt-2 text-white/80">Explore our chef's selections</p>
      </div>

      {/* Category Slider */}
      <div className="h-[30%] flex items-end">
      <div
        ref={textScrollRef}
        className="text-scroll flex space-x-40 items-end flex-nowrap overflow-x-auto overflow-y-hidden px-178 relative z-10  pt-10"
      >
        {slider.map((section, index) => (
          <h1
            ref={(el) => (menuRefs.current[index] = el)}
            key={index}
            onClick={() => handleCategoryClick(section.section_name)}
            className={`sectionName shrink-0 text-white cursor-pointer ${
              activeSection === section.section_name ? "text-5xl active" : "text-3xl"
            }`}
          >
            {section.section_name}
          </h1>
        ))}
      </div>
      </div>

      {/* Scale Pattern */}
      <div className="scale-pattern relative z-10 w-full overflow-hidden">
        <svg
          className="w-full h-8 scale-x-[1.06] scale-y-[-1]"
          viewBox="0 0 1200 24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ background: 'transparent' }}
        >
          {/* Large ticks */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`large-${i}`}
              x1={i * 80}
              y1="0"
              x2={i * 80}
              y2="24"
              stroke="white"
              strokeWidth="1.5"
            />
          ))}

          {/* Medium ticks */}
          {Array.from({ length: 61 }).map((_, i) => {
            // Skip positions where large ticks are already placed
            if (i % 4 !== 0) {
              return (
                <line
                  key={`medium-${i}`}
                  x1={i * 20}
                  y1="8"
                  x2={i * 20}
                  y2="24"
                  stroke="white"
                  strokeWidth="1.2"
                />
              );
            }
            return null;
          })}

          {/* Small ticks */}
          {Array.from({ length: 121 }).map((_, i) => {
            // Skip positions where medium or large ticks are already placed
            if (i % 2 !== 0) {
              return (
                <line
                  key={`small-${i}`}
                  x1={i * 10}
                  y1="16"
                  x2={i * 10}
                  y2="24"
                  stroke="white"
                  strokeWidth="1"
                />
              );
            }
            return null;
          })}
        </svg>
      </div>

      {/* Menu Item Slider */}
      <div className="w-full flex justify-center relative z-10 h-[56%]">
        <div className="w-[1300px] h-full flex relative px-6">
          <div ref={sliderContainerRef} className="slider-container flex items-center gap-x-28 overflow-x-auto" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingLeft: 'calc(50% - 10vw)', paddingRight: 'calc(50% - 10vw)' }}>
            {activeSectionData.items.map((item, index) => (
              <div
                key={index}
                ref={(el) => (menuItemRefs.current[index] = el)}
                className={`slider-item h-[90%] flex-shrink-0 rounded-lg flex flex-col ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <div className="w-full h-[28vh] flex items-start justify-center overflow-hidden">
                  <img
                    className="object-contain rounded-lg w-full h-auto max-h-[28vh]"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="text-white w-full overflow-hidden mt-2" style={{ minHeight: '80px' }}>
                  <div className={`transition-opacity duration-300 ${currentIndex === index ? 'opacity-100' : 'opacity-0 absolute'}`}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <button className="discover-button">
                      Discover more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToPrev}
            className="absolute left-4 top-28 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollToNext}
            className="absolute right-5 top-28 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section3;