import React from 'react'

const LandingPage = () => {
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
    </>
  )
}

export default LandingPage