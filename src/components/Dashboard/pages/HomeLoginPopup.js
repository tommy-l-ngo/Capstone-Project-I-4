import React from "react";
import "../Dashboard.css";
import "../../Login/Login.css";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";
import LoginPopup from "../../Login/LoginPopup";
import { Link } from "react-router-dom";
function HomeLoginPopup() {
  return (
    <>
      {/* <div className="loginFormContainer"></div> */}
      <LoginPopup />
      <Link to="/Home" style={{textDecoration:'none'}}>
        <div className="mainContent">
          <Navbar />
          <HeroSection />
          <Cards />
        </div>
      </Link>
    </>
  );
}

export default HomeLoginPopup;
