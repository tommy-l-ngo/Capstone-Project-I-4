import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginPopup from "../Login/LoginPopup";
import { userGlobal, getUserGlobal } from "../Login/LoginForm";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, get, ref, child } from "firebase/database";
import Notifications from "../Notifications/Notifications";
import { MessageContext } from "../Login/App";
import { useNavigate } from "react-router-dom";
//import ReactSwitch from "react-switch";


export var fadeIn = false;
export function setFade(b) {
  fadeIn = b;
}

export function getFade() {
  return fadeIn;
}
const auth = getAuth();



function Navbar() {
  const [messageAlert, setMessageAlert] = useContext(MessageContext);
  const [navMessageAlert, setNavMessageAlert] = useState(false);
  const dbRef = ref(getDatabase());
  const [userEUID, setUserEUID] = useState("");

  const [click, setClick] = useState(false);
  const [User, setUser] = useState(null);
  const [clickLogin, setClickLogin] = useState(false);
  const [clickReg, setClickReg] = useState(false);
  const [dName, setDName] = useState("");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleClickLogin = () => setClickLogin(!clickLogin);
  const handleClickReg = () => setClickReg(!clickReg);
  const [welcomeName, setWelcomeName] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  /*
    Encapsulated within useEffect to set listener only once and prevent infinite loop. 
    Refer to comment in CreateProject.js for explanation
  */
  useEffect(() => {

    setNavMessageAlert(messageAlert);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // user.getIdToken(true);
        setUser(user);
        const uid = user.uid; // Current user's Unique ID (NOT related to EUID)
  
        get(child(dbRef, "users"))
          .then((snapShot) => {
            let match = false;
            if (snapShot.exists()) {
              console.log("User uID: " + uid);

              if (uid == "QHAPyKzcbhO4qNKGGMqpt0spcR83") // hardcoded admin credentials
              { 
                navigate("/Admin");
              }
  
              match = snapShot.forEach((curr) => {
                const ID = curr.ref._path.pieces_[1];
                //console.log(curr.ref._path.pieces_[1]);
                //console.log(snapShot.child(ID).child("email").val());
                let currUID = snapShot.child(ID).child("uid").val();
                //console.log(curr);
                //IDs.push(ID);
                if (currUID === uid) {
                  // user1 = { eUID: ID, email: currEmail };
                  setUserEUID(ID);
                  const name = snapShot.child(ID).child("firstName").val();
                  setWelcomeName("Welcome,  " + name);
  
                  return true;
                }
              });
              return match;
              //console.log(IDs);
              //console.log(userEmail);
            }
          })
          .then((match) => {
            try {
              if (match) {
                // setError("Email already exists. Try logging in.");
                // setButtonDisabled(true);
                // throw Error("Email does not exist in system");
              } else {
                setWelcomeName(User.email);
                // setError("");
                // setButtonDisabled(false);
              }
            } catch (err) {
              console.log(err.code);
              console.log(err);
              // setError(err.message);
            }
          });
      } else {
        setUser("");
      }
    });
  }, []);


  const scrollToTop = () => { //Code to make page scroll to top
    window.scrollTo(0, 0)
  }

  const [theme, setTheme] = useState("Light Mode");
  function handleButtonClick() {
    setTheme((curr) => (curr === "Light Mode" ? "Dark Mode" : "Light Mode"));
    //window.location.reload(false);
  }

  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <>
      <nav className="navbar" id={localStorage.getItem('currTheme')}>
        <div className="navbar-container">
          <Link to="/" className="navbar-title" onClick={function(event){ closeMobileMenu(); scrollToTop()}}>
            Ph.D. Scheduler
          </Link>
          {/*<Link to="/" className="navbar-logo" onClick={function(event){ closeMobileMenu(); scrollToTop()}}></Link>*/}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {User ? (
            <div className="navbar-logout-container">
              <div>{welcomeName}</div>
              <div className="logOutBtn">
                <button className="navbar-login-box" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
              <div className="notification_bell">
                <button onClick={() => setDropdownOpen(prevState => !prevState)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                </button>
                  {dropdownOpen && <div className="notifs-box"><div className="displayNotifs"><Notifications /></div></div>}
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
                to="/Todo"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                To-do
              </Link>
            </li>

            <li className="nav-item">
                <Link
                  to="/Chat"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Chat
                  {navMessageAlert && <span className="newMessage"></span>}
                </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/#"
                className="nav-links-mobile"
                onClick={handleButtonClick}
              >
                {theme}
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
