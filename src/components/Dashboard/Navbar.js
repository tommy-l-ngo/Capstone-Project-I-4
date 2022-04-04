import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginPopup from "../Login/LoginPopup";

export var fadeIn = false;
export function setFade(b) {
  fadeIn = b;
}

export function getFade() {
  return fadeIn;
}

function Navbar() {
  const [click, setClick] = useState(false);

  const [clickLogin, setClickLogin] = useState(false);
  const [clickReg, setClickReg] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleClickLogin = () => setClickLogin(!clickLogin);
  const handleClickReg = () => setClickReg(!clickReg);

  return (
    <>
      <div className={clickLogin ? "log1 active1" : "log1"}>
        {/* <LoginPopup /> */}
      </div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-title" onClick={closeMobileMenu}>
            Mock Dashboard
          </Link>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}></Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <div className="navbar-login-container">
            <div>
              <Link
                to="/Login"
                onClick={() => {fadeIn = true}}
              >
                <button className="navbar-login-box" onClick={handleClickLogin}>
                  Log in
                </button>
              </Link>
              <Link
                to="/RegisterAs"
                onClick={() => {fadeIn = true}}
              >              <button className="navbar-login-box2">Register</button></Link>
            </div>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/page2" className="nav-links" onClick={closeMobileMenu}>
                Page 2
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/page3" className="nav-links" onClick={closeMobileMenu}>
                Page 3
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/page4" className="nav-links" onClick={closeMobileMenu}>
                Page 4
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/page5" className="nav-links" onClick={closeMobileMenu}>
                Page 5
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
