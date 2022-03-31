import React, { useEffect } from "react";
import InputField2 from "./InputField2";
import { Navi } from "./Navi";
import SubmitButton from "./SubmitButton";

export default function Forgot() {
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");
  function resetPassword(){
    console.log("Reset Password");
  }

  useEffect(() => {
    // Update the document title using the browser API
    document.documentElement.style.setProperty("--loginFormHeight", "290px");
    document.documentElement.style.setProperty("--loginFormWidth", "400px");
  });

  return (
    <div>
      <div className="loginFormContainer">
        <div className="forgotContainer">
          <div className="titleBar">
            <Navi destination="/" />

            <div className="titleText2">Forgot Password</div>
          </div>
          <div className="loginFormContentForgot">
            <div className="emailInput">
              <InputField2 type="text" placeholder="Email" />
            </div>
            <SubmitButton text="Reset Password" onClick={resetPassword}/>
          </div>
        </div>
      </div>
    </div>
  );
}
