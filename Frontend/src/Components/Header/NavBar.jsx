import React, { useEffect, useState, useRef } from 'react';
import './NavBar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../../assets/Icons/userIcon.svg'
import logoutIcon from '../../assets/Icons/logout.svg'
import { useAuth } from '../../Context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Track scroll direction and distance
    let lastScrollTop = 0;
    let scrollDistance = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollTop;
      const scrollDelta = Math.abs(currentScrollY - lastScrollTop);

      // Update accumulated scroll distance in the current direction
      if (scrollingDown) {
        // Only accumulate if we're already past the threshold
        if (currentScrollY > 100) {
          // Add scroll delta with a dampening factor to make it less sensitive
          scrollDistance += scrollDelta;
        } else {
          scrollDistance = 0;
        }
      } else {
        // Reset distance when direction changes
        scrollDistance = 0;

        // Show immediately when scrolling up
        setIsVisible(true);
      }

      // Hide navbar if we've scrolled down a significant amount (100px)
      if (scrollingDown && scrollDistance > 100 && currentScrollY > 100) {
        // Hide immediately with CSS handling the transition
        setIsVisible(false);
      }

      // Always show navbar when at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
        scrollDistance = 0;
      }

      // Update last scroll position
      lastScrollTop = currentScrollY;

      // Set scrolled state for background color change
      setIsScrolled(currentScrollY > 50);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className={`navbar-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
        <nav
          ref={navRef}
          className={`navbar ${isHomePage ? (isScrolled ? 'scrolled' : 'home') : 'default'}`}
        >
          <div className="navbar-container">
            <div className="navbar-brand">
              <Link to="/" className="brand-logo">
                <span className="logo-text">SavorBites</span>
                <span className="logo-accent"></span>
              </Link>
            </div>

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/menu" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span>Menu</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/table" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span>Reservations</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/order" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span>Orders</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span>Cart</span>
                  </NavLink>
                </li>
                {isAuthenticated ? (
                  <li className="nav-item user-menu">
                    <div className="user-profile">
                      <div className="user-avatar">
                        <img src={userIcon} alt="User" />
                      </div>
                      <span className="user-name">{user?.username || 'User'}</span>
                      <div className="dropdown">
                        <button onClick={handleLogout} className="dropdown-item">
                          <img src={logoutIcon} alt="Logout" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink to="/signup" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                      <span>Register</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;