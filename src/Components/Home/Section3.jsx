import React, { useEffect, useRef, useState } from "react";
import scale from "../../assets/Icons/scale.png";
import { Menu } from "../../DB/MenuDB";

const Section3 = () => {
  const [activeSection, setActiveSection] = useState(Menu[0].section_name);
  const [currentIndex, setCurrentIndex] = useState(0);
  const menuRefs = useRef([]); // For category items in .text-scroll
  const menuItemRefs = useRef([]); // For menu items in .menu-container
  const textScrollRef = useRef(null);

  // Update active section when scrolling the .text-scroll div
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
            closestSection = Menu[index].section_name;
          }
        }
      });

      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
        setCurrentIndex(0); // Reset menu item index when category changes
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

  // Scroll to the active section in .text-scroll when it changes (for click events)
  useEffect(() => {
    const activeIndex = Menu.findIndex((item) => item.section_name === activeSection);
    if (menuRefs.current[activeIndex]) {
      menuRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  // Center the menu item in .menu-container when activeSection or currentIndex changes
  useEffect(() => {
    if (menuItemRefs.current[currentIndex]) {
      menuItemRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activeSection, currentIndex]);

  const scrollToNext = () => {
    const items = document.querySelectorAll(".menu-item");
    if (currentIndex < items.length - 1) {
      const nextIndex = currentIndex + 1;
      items[nextIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      setCurrentIndex(nextIndex);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const items = document.querySelectorAll(".menu-item");
      items[prevIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="h-screen bg-amber-100">
      {/* Category Slider */}
      <div
        ref={textScrollRef}
        className="text-scroll flex space-x-40 items-end flex-nowrap h-[35%] overflow-x-auto px-178"
      >
        {Menu.map((section, index) => (
          <h1
            ref={(el) => (menuRefs.current[index] = el)}
            key={index}
            onClick={() => {
              setActiveSection(section.section_name);
              setCurrentIndex(0);
            }}
            className={`sectionName shrink-0 ${
              activeSection === section.section_name ? "text-6xl active" : "text-3xl"
            }`}
          >
            {section.section_name}
          </h1>
        ))}
      </div>

      {/* Scale Pattern */}
      <div className="scale-pattern">
        <img
          className="w-full object-cover scale-x-[1.06] -scale-y-50"
          src={scale}
          alt="Scale Pattern"
        />
      </div>

      {/* Menu Item Slider */}
      <div className="w-full h-[60%] flex justify-center items-baseline p-8">
        <div className="w-[1300px] flex items-center relative">
          <div className="menu-container flex items-center gap-24 overflow-hidden px-108">
            {Menu.filter((section) => section.section_name === activeSection).map((section) =>
              section.items.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (menuItemRefs.current[index] = el)} // Add ref to menu items
                  className={`menu-item flex-shrink-0 rounded-3xl shadow-lg p-4 flex flex-col items-center justify-center ${
                    currentIndex === index ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    index < currentIndex ? scrollToPrev() : scrollToNext();
                  }}
                >
                  <img
                    className="w-[100px] h-[100px] object-cover rounded-lg m-auto"
                    src={item.image}
                    alt={item.name}
                  />
                  <h1
                    className={`m-2 text-lg ${
                      currentIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.name}
                  </h1>
                  <p
                    className={`w-[300px] px-2 ${
                      currentIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={scrollToPrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
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
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
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