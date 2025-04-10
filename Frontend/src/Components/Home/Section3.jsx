import React, { useEffect, useRef, useState } from "react";
import scale from "../../assets/Icons/scale.png";
import { slider } from "../../DB/MenuDB";

const Section3 = () => {
  const [activeSection, setActiveSection] = useState(slider[0].section_name);
  const [currentIndex, setCurrentIndex] = useState(0);
  const menuRefs = useRef([]);
  const menuItemRefs = useRef([]);
  const textScrollRef = useRef(null);
  const hasInteracted = useRef(false);

  // Force page to top on mount (optional, removed unless explicitly needed)
  useEffect(() => {
    console.log("Section3 mounted, scroll position:", window.scrollY);
  }, []);

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

    if (menuItemRefs.current[currentIndex]) {
      menuItemRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Prevent vertical scroll
        inline: "center", // Only horizontal scroll
      });
    }
  }, [currentIndex]);

  const scrollToNext = () => {
    const activeSectionData = slider.find((section) => section.section_name === activeSection);
    if (currentIndex < activeSectionData.items.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      hasInteracted.current = true;
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      hasInteracted.current = true;
    }
  };

  const handleCategoryClick = (sectionName) => {
    setActiveSection(sectionName);
    setCurrentIndex(0);
    hasInteracted.current = true;
  };

  const handleItemClick = (index) => {
    setCurrentIndex(index);
    hasInteracted.current = true;
  };

  const activeSectionData = slider.find((section) => section.section_name === activeSection);
  const backgroundImage = activeSectionData?.image || "";

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

      {/* Category Slider */}
      <div
        ref={textScrollRef}
        className="text-scroll flex space-x-40 items-end flex-nowrap h-[35%] overflow-x-auto overflow-y-hidden px-178 relative z-10"
      >
        {slider.map((section, index) => (
          <h1
            ref={(el) => (menuRefs.current[index] = el)}
            key={index}
            onClick={() => handleCategoryClick(section.section_name)}
            className={`sectionName shrink-0 text-white cursor-pointer ${
              activeSection === section.section_name ? "text-6xl active" : "text-3xl"
            }`}
          >
            {section.section_name}
          </h1>
        ))}
      </div>

      {/* Scale Pattern */}
      <div className="scale-pattern relative z-10">
        <img
          className="w-full object-cover scale-x-[1.06] -scale-y-50"
          src={scale}
          alt="Scale Pattern"
        />
      </div>

      {/* Menu Item Slider */}
      <div className="w-full h-[60%] flex justify-center items-baseline relative z-10">
        <div className="w-[1300px] flex items-center relative overflow-hidden">
          <div className="menu-container flex items-center gap-28 pt-4 overflow-x-auto px-118">
            {activeSectionData.items.map((item, index) => (
              <div
                key={index}
                ref={(el) => (menuItemRefs.current[index] = el)}
                className={`menu-item flex-shrink-0 rounded-lg flex flex-col ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <div className="w-full h-[31vh]">
                  <img
                    className="object-contain rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="text-white min-h-[60px]">
                  {currentIndex === index ? (
                    <>
                      <h1>{item.name}</h1>
                      <p>{item.description}</p>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white disabled:opacity-50"
            disabled={currentIndex === 0}
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
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white disabled:opacity-50"
            disabled={currentIndex === activeSectionData.items.length - 1}
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