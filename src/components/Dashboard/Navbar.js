import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
              <Link to='/' className='navbar-title' onClick={closeMobileMenu}>
                Mock Dashboard
              </Link>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/page2' className='nav-links' onClick={closeMobileMenu}>
                    Page 2
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/page3' className='nav-links' onClick={closeMobileMenu}>
                    Page 3
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/page4' className='nav-links' onClick={closeMobileMenu}>
                    Page 4
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/page5' className='nav-links' onClick={closeMobileMenu}>
                    Page 5
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/logout' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>    
        </nav>    
    </>
  )
}

export default Navbar;