import React, { useEffect, useRef, useState } from 'react'
import scale from '../../assets/Icons/scale.png'
import {Menu} from '../..//DB/MenuDB'

const Section3 = () => {

    const [activeSection, setActiveSection] = useState(Menu[0].section_name);
    // const [activeIndex, setActiveIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const menuRefs = useRef([]);

    useEffect(() => {
      const activeIndex = Menu.findIndex((item) => item.section_name === activeSection);
      if (menuRefs.current[activeIndex]) {
        menuRefs.current[activeIndex].scrollIntoView({
          // behavior: "smooth",
          block: "nearest",
          inline: "center", 
        });
      }
    }, [activeSection]);

    const scrollToNext = () => {
      const items = document.querySelectorAll('.menu-item');
      if (currentIndex < items.length - 1) {
        const nextIndex = currentIndex + 1;
        items[nextIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        setCurrentIndex(nextIndex);
      }
    };
    
    const scrollToPrev = () => {
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        const items = document.querySelectorAll('.menu-item');
        items[prevIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        setCurrentIndex(prevIndex);
      }
    };


  return (
    <>
    <div className='h-screen bg-amber-100'>
          <div className='text-scroll flex space-x-40 items-end flex-nowrap h-[35%] overflow-x-auto  px-178'>
            { Menu.map((section, index) => {
               return (
                <h1
                 ref={(el) => (menuRefs.current[index] = el)}
                 key={index} onClick={() => {
                  setActiveSection(section.section_name);
                  }}
                 className={`sectionName shrink-0
                  ${activeSection === section.section_name ? 'text-6xl' : 'text-3xl'}`}>{section.section_name}</h1>
              )}) 
            }
          </div>
    
          <div className='scale-pattern'>
            <img className='w-full object-cover scale-x-[1.06] -scale-y-50' src={scale} alt="Scale Pattern"/>
          </div>
    
          <div className='w-full h-[60%] flex justify-center items-baseline p-8'>
            <div className='w-[1300px] flex items-center relative'>
              <div className='menu-container flex items-center gap-24 overflow-hidden px-108'>
                {Menu.filter((section) => section.section_name === activeSection).map((section) => 
                  section.items.map((items,index) => {
                    return(
                      <>
                      <div key={index}
                       className={`menu-item flex-shrink-0 rounded-3xl shadow-lg p-4 flex flex-col items-center justify-center ${currentIndex === index ? 'active' : ''}`}
                       onClick={() =>{
                        setCurrentIndex(index);
                        index < currentIndex ? scrollToPrev() : scrollToNext();
                       }}>
                        <img className='w-[100px] h-[100px] object-cover rounded-lg m-auto' src={items.image}/>
                        <h1 className={`m-2 text-lg ${currentIndex === index ? 'opacity-100':'opacity-0'}`}>{items.name}</h1>
                        <p className={`w-[300px] px-2 ${currentIndex === index ? 'opacity-100':'opacity-0'}`}>{items.description}</p>
                      </div>
                      </>
                    )
                  }))
                }
              </div>
                <button 
                  onClick={scrollToPrev}
                  className='absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
    
                <button 
                  onClick={scrollToNext}
                  className='absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
            </div>
          </div>
        </div> 
    </>
  )
}

export default Section3