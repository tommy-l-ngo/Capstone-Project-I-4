import React from "react";
import { RegisterPopup } from "../../Login/RegisterPopup";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import Cards from "../Cards";
import { Link } from "react-router-dom";

export const HomeRegisterPopup = () => {
  return (
    <>
      <RegisterPopup />
      <Link to="/RegisterAs">
        <div className="mainContent">
          <Navbar />
          <HeroSection />
          <Cards />
        </div>
      </Link>
    </>
  );
};
