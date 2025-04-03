import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <nav className='flex justify-between bg-gray-800 text-white p-4 px-28'>
      <ul className='flex gap-x-4'>
        <li><a href="/">SavorBites</a></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
      </ul>
      <ul className='flex gap-x-4'>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/table">table</Link></li>
        <li><Link to="/cart">cart</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default NavBar