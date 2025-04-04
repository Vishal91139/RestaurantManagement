import React from 'react'
import Food1 from '../../assets/Images/Food1.png'
import Food2 from '../../assets/Menu/Breakfast/Breakfast3.png'
import Food3 from '../../assets/Menu/Breakfast/Breakfast1.png'
import foodbg from '../../assets/Images/foodbg.jpg'
import { Link } from 'react-router-dom'

const Section2 = () => {
  return (
    <>
    <div className=' flex px-15 pt-8 '>
          <div className='leftpart w-[60%] relative pl-12 py-20'>
            <h1 className='text-3 flex relative'>EXPERIENCE OF REAL RECIPES TASTE
              <img className='w-22 h-22 absolute object-contain bottom-2 left-80' src={Food2} />
            </h1>
            <div className='flex items-center justify-between mt-10 '>
              <div className='flex items-center gap-4'>
                <img className='border-8 rounded-full border-orange-300' width={80} src={Food3} alt="Food" />
                <h2 className='text-4 max-w-xl'>Bringing bold flavors and fresh ingredients to your plate, one unforgettable meal at a time.</h2>
              </div>
              <Link to='/menu' className="underline w-20 hover:text-blue-600 transition-colors text-sm hover:cursor-pointer">
                View All
              </Link>
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
    </>
  )
}

export default Section2