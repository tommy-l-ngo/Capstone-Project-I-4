import React from 'react'
import InputField2 from './InputField2';
import { Navi } from "./Navi";

export default function Forgot(){
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");
    
  return (
    <div>
      <div className="loginFormContainer">
      <Navi destination="/"/>
      <div className="forgotContainer">
        <div className="titleText">
        Forgot Password
        </div>
        <div className="emailInput">
          <InputField2 type="text" placeholder="Email" />
        </div>
        <button>Reset Password</button>
      </div>
      </div>
    </div>
  );
}
