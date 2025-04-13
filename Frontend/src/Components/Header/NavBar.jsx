import React from 'react';
import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // <-- Adjust the path if AuthContext.js is elsewhere

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // <-- Get auth state and functions
  const navigate = useNavigate(); // <-- Hook for navigation

  const handleLogout = () => {
    logout(); 
    console.log(isAuthenticated)
    // navigate('/login');
  };

  return (
    <>
      <nav className='navBAr flex justify-between top-0 w-full z-50 px-[40px] bg-transparent py-[10px] fixed '> {/* Added items-center & responsive padding */}
        <ul className='flex p-5 gap-x-8'> 
          <li><Link to="/" className="text-xl text-white font-bold">SavorBites</Link></li> {/* Make brand a Link */}
        </ul>

        <ul className='flex items-center gap-x-4 md:gap-x-5'> 
          <li><NavLink className={({ isActive }) => (isActive ? 'navName active' : 'navName')} to="/menu"> MENU </NavLink></li>
          <li><NavLink to="/table" className={({ isActive }) => (isActive ? 'navName active' : 'navName')}>RESERVATIONS</NavLink></li>
          <li><NavLink to="/order"  className={({ isActive }) => (isActive ? 'navName active' : 'navName')}>ORDERS</NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => (isActive ? 'navName active' : 'navName')}>CART</NavLink></li>
          { isAuthenticated ? 
           ( <div className='user-menu relative'>
              <span className="text-xl text-white block cursor-pointer"> 
                {user?.username || 'User'}
              </span> 
              <div className='dropdown hidden text-white'>
                <button onClick={handleLogout} className='logout-btn text-xl text-white'> Logout </button>
              </div>
            </div> )
            : <NavLink to="/signup" className={({ isActive }) => (isActive ? 'navName active' : 'navName')}>REGISTER</NavLink>
          } 
        </ul>
      </nav>
    </>
  );
}

export default NavBar;