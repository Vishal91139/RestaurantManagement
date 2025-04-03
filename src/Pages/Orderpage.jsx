import React from 'react'
import './Orderpage.css'
import closeIcon from '../assets/Icons/close.png'

const Orderpage = () => {
  return (
    <>  
    <div className='flex items-center flex-col'>
        <h1 className='menu-title flex justify-center text-3xl'>Orders</h1>
        <h1 className='flex justify-center text-4xl font-bold mb-5'>Your Journey to Flavor Begins Here!</h1>
        <div className='flex justify-between items-center border-2 border-gray-200 mt-6 p-6 w-145 rounded-2xl hover:shadow-md'>
            <div>
                <h1 className='font-semibold text-lg'>vishal kumar</h1>
                <p className='text-gray-500 text-sm'>Order : dswjhankkjfw</p>
                <p className='text-gray-500 text-sm'>Table : 234</p>
            </div>
            <button className='view-button p-2 px-3 text-sm text-purple-600 rounded-sm hover:shadow-md'>VIEW TABLE</button>
            <div className='w-9 hover:bg-gray-200 rounded-full p-1 duration-200 cursor-pointer'><img src={closeIcon}/></div>
        </div>
    </div>
    </>
  )
}

export default Orderpage