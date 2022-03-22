import React from 'react'
import InputField2 from './InputField2';
import LoginForm from './LoginForm';
import { Navi } from "./Navi";

export const Forgot = () => {
      document.documentElement.style.setProperty("--loginFormHeight", "300px");
    
  return (
    <div>
      <Navi />
      <div className="loginFormContainer">
      <div className="forgotContainer">
        <div className="titleText">
        Forgot Password
        </div>
        <div className="emailInput">
          <InputField2 type="text" placeholder="Email" />
        </div>
      </div>
      </div>
    </div>
  );
}
