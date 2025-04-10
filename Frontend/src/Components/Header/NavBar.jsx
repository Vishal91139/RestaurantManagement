import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../../Context/AuthContext';

const NavBar = () => {
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();

  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  return (
    <nav className={`navBar top-0 w-full z-50 px-[20px] ${isHomePage ? 'bg-transparent py-[10px] fixed' : 'bg-orange-400 sticky'}`}>
      <ul className="flex p-5 gap-x-8">
        <li>
          <a className="navName">SavorBites</a>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
            to="/menu"
          >
            MENU
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-x-8">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
            to="/"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
            to="/table"
          >
            RESERVATIONS
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
            to="/order"
          >
            ORDERS
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
            to="/cart"
          >
            CART
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (<label className='navName'>
                {user.username.toUpperCase()}</label>) : (
              <NavLink className={({ isActive }) => (isActive ? 'navName active' : 'navName')}
                to="/signup">
                SIGNUP </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;