import React, { useEffect } from "react";
import InputField3 from "./InputField3";
import { Navi } from "./Navi";
import SubmitButton from "./SubmitButton";

export default function Forgot() {
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");

  useEffect(() => {
    // Update the document title using the browser API
    document.documentElement.style.setProperty("--loginFormHeight", "250px");
    document.documentElement.style.setProperty("--loginFormWidth", "350px");
  });

  return (
    <>
      {/* <div className="forgotContainer"> */}
      <div className="titleBar">
        <Navi destination="/Login" />
        <div className="titleText2">Forgot Password</div>
      </div>
      <div className="loginFormContentForgot">
        <div className="emailInput">
          <InputField3 type="text" placeholder="Email" />
        </div>
        <SubmitButton text="Reset Password" />
      </div>
      {/* </div> */}
    </>
  );
}
