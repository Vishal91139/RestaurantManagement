import React from 'react'
import './Menupage.css'
import {Menu} from '../DB/MenuDB'
import MenuItem from '../Components/Menu/MenuItem'

const Menupage = () => {
  return (
    <>
    <h1 className='menu-title flex justify-center text-3xl'>Menu</h1>
    <h1 className='flex justify-center text-4xl font-bold'>Discover Our Flavorful Symphony!</h1>
    {
      Menu.length ? Menu.map((section, index) => {
        return (
          <div key={index} className='mt-10 mb-10'>
            <h2 className='text-2xl px-40 py-4'>{section.section_name}</h2>
            <div className='menu-container flex justify-center items-center gap-40'>
              {
                section.items && section.items.map((items,index) => <MenuItem key={index} items={items}/>)
              }
            </div>
          </div>
        )}) : <h2>No Menu Available</h2>
    }
    </>
  )
}

export default Menupage