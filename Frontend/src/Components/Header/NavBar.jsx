import React, { useEffect, useState, useRef } from 'react';
import './NavBar.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../../assets/Icons/userIcon.svg';
import logoutIcon from '../../assets/Icons/logout.svg';
import { useAuth } from '../../Context/AuthContext';
import { gsap } from 'gsap';

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
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollTop && currentScrollY > 150) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollTop || currentScrollY < 150) {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);

      lastScrollTop = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [isVisible]);

  const isHomePage = location.pathname === '/';

  return (
    <header
      ref={navRef}
      className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''} ${
        isVisible ? 'visible' : 'hidden'
      }`}
    >
      <nav
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
                <NavLink
                  to="/menu"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span>Menu</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/table"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span>Reservations</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/order"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span>Orders</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
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
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    <span>Register</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;