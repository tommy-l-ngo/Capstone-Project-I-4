import React from 'react'
import { RegisterAsPopup } from '../../Login/RegisterAsPopup';
import Navbar from '../Navbar';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import { Link } from 'react-router-dom';
export const HomeRegisterAsPopup = () => {
  return (
    <>
      {/* <div className="loginFormContainer"></div> */}
      <RegisterAsPopup />
      <Link to="/Home">
        <div className="mainContent">
          <Navbar />
          <HeroSection />
          <Cards />
        </div>
      </Link>
    </>
  );
}
