import React, { useEffect, useRef, useState } from 'react'
import landingPage from '../assets/Images/restaurant-interior.jpg'
import wavy from '../assets/Icons/wavy.png'
import down from '../assets/Icons/down.png'
import Food1 from '../assets/Images/Food1.png'
import Food2 from '../assets/Menu/Breakfast/Breakfast3.png'
import Food3 from '../assets/Menu/Breakfast/Breakfast1.png'
import foodbg from '../assets/Images/foodbg.jpg'
import scale from '../assets/Icons/scale.png'
import './Homepage.css'
import {Menu} from '../DB/MenuDB'

const Homepage = () => {

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
    <div className='relative w-full h-screen'>
      <img className='w-full h-full object-cover' src={landingPage}/>
      <div className="overlay absolute bg-black/50 inset-0 flex justify-center">
        <div className='absolute top-62'>
          <h1 className='text-1 text-9xl'>SavorBites</h1>
          <p className='text-2 text-white tracking-wider'>Explore Flavors <span className='mx-2'>|</span> Savor Every Bite <span className='mx-2'>|</span> Fill Your Appetite!</p>
        </div>
        <div className="absolute bottom-15 left-25 text-white w-2/6 ">
          <p className="bottomleft">
            SavorBites, where flavors come alive! Experience the finest ingredients, crafted into mouthwatering dishes by our expert chefs. Whether you're dining in 
            or ordering online, we promise a delightful journey of taste and hospitality.
          </p>
        </div>
        <div className='absolute bottom-12 right-35 text-white '>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
              <path 
                id="circlePath" 
                d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                fill="none"
                stroke="transparent"
              />
              <text>
                <textPath 
                  href="#circlePath" 
                  startOffset="0%" 
                  className="circulartext fill-white"
                >
                  LEARN MORE ABOUT THE RESTAURANT 
                </textPath>
              </text>
            </svg>
            <button className="relative flex items-center justify-center w-25 h-25">
              <img className="animate-button absolute w-full h-full" src={wavy} alt="Wavy Background" />
              <img className="absolute w-8 h-8 z-10" src={down} alt="Down Arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>


    <div className=' flex px-15 pt-8 '>
      <div className='leftpart w-[60%] relative pl-12 py-20'>
        <h1 className='text-3 flex relative'>EXPERIENCE OF REAL RECIPES TASTE
          <img className='w-22 h-22 absolute object-contain bottom-2 left-80' src={Food2} />
        </h1>
        <div className='flex items-center justify-between mt-10 pr-4'>
          <div className='flex items-center gap-4'>
            <img className='border-8 rounded-full border-orange-300' width={80} src={Food3} alt="Food" />
            <h2 className='text-4 max-w-xl'>Bringing bold flavors and fresh ingredients to your plate, one unforgettable meal at a time.</h2>
          </div>
          <button className="underline w-30 hover:text-blue-600 transition-colors text-sm">
            View All
          </button>
        </div>
      </div>
      <div className='rightpart w-[40%] relative py-12 '>
        <img className='food w-125 absolute -left-5 object-cover' src={Food1}/>
        <div className='foodbg ml-10 mt-5 w-110 h-110 overflow-hidden'>
          <img className='w-full h-full' src={foodbg}/>
        </div>
        <div>
        </div>
      </div>
    </div>


    <div className='h-screen bg-amber-100'>
      <div className='text-scroll flex space-x-40 items-end flex-nowrap h-[35%] overflow-x-auto overflow-y-hidden px-168'>
        { Menu.length ? Menu.map((section, index) => {
           return (
            <h1
             ref={(el) => (menuRefs.current[index] = el)}
             key={index} onClick={() => {
              setActiveSection(section.section_name);
              }}
             className={`sectionName shrink-0
              ${activeSection === section.section_name ? 'text-6xl' : 'text-3xl'}`}>{section.section_name}</h1>
          )}) : <div>No items</div>
        }
      </div>

      <div className='scale-pattern'>
        <img className='w-full object-cover scale-x-[1.06] -scale-y-50' src={scale} alt="Scale Pattern"/>
      </div>

      <div className='w-full h-[60%]'>
        <div className='max-w-[1200px] mx-auto flex items-center justify-center relative'>
          <div className='menu-container flex items-center gap-24 w-full overflow-hidden px-108'>
            {Menu.filter((section) => section.section_name === activeSection).map((section) => 
              section.items.map((items,index) => {
                return(
                  <>
                  <div key={index}
                   className={`menu-item flex-shrink-0 w-[350px] rounded-lg shadow-lg p-4 ${currentIndex === index ? 'active' : ''}`}
                   onClick={() =>{
                    setCurrentIndex(index);
                    index < currentIndex ? scrollToPrev() : scrollToNext();
                   }}>
                    <img className='w-full h-[100px] object-cover rounded-lg' src={items.image}/>
                    <h1>{items.name}</h1>
                    <p>{items.description}</p>
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

export default Homepage