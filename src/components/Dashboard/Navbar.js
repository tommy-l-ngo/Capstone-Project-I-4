import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginPopup from "../Login/LoginPopup";
import { userGlobal, getUserGlobal } from "../Login/LoginForm";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export var fadeIn = false;
export function setFade(b) {
  fadeIn = b;
}

export function getFade() {
  return fadeIn;
}
const auth = getAuth();

function Navbar() {
  const [click, setClick] = useState(false);
  const [User, setUser] = useState("");
  const [clickLogin, setClickLogin] = useState(false);
  const [clickReg, setClickReg] = useState(false);
  const [dName, setDName] = useState("");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleClickLogin = () => setClickLogin(!clickLogin);
  const handleClickReg = () => setClickReg(!clickReg);

  const auth = getAuth();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // user.getIdToken(true);
      setUser(user);
      const uid = user.uid; // Current user's Unique ID (NOT related to EUID)

    } else {
      setUser("");
    }
  });

  useEffect(() => {

  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-title" onClick={closeMobileMenu}>
            Mock Dashboard
          </Link>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}></Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {User ? (
            <div className="navbar-logout-container">
              <div>Welcome, {User.email}</div>
              <div className="logOutBtn">
                <button className="navbar-login-box" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-login-container">
              <Link
                to="/Login"
                onClick={() => {
                  fadeIn = true;
                }}
              >
                <button className="navbar-login-box" onClick={handleClickLogin}>
                  Log in
                </button>
              </Link>
              <Link
                to="/RegisterAs"
                onClick={() => {
                  fadeIn = true;
                }}
              >
                <button className="navbar-login-box2">Register</button>
              </Link>
            </div>
          )}
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
                to="/Calendar"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/#"
                className="nav-links-mobile"
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                  closeMobileMenu();
                }}
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
