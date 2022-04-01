import React from "react";
import "../Dashboard.css";
import "../../Login/Login.css";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";
import LoginPopup from "../../Login/LoginPopup";
import { Link } from "react-router-dom";
import { ForgotPopup } from "../../Login/ForgotPopup";

export const HomeForgotPopup = () => {
  return (
    <>
      {/* <div className="loginFormContainer"></div> */}
      <ForgotPopup />
      <Link to="/Home">
        <div className="mainContent">
          <Navbar />
          <HeroSection />
          <Cards />
        </div>
      </Link>
    </>
  );
};
