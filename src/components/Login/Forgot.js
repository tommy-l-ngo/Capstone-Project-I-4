import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { Navi } from "./Navi";
import SubmitButton from "./SubmitButton";



export default function Forgot() {
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");
  const [disabledBtn, setDisabledBtn] = useState(false);
  function resetPassword(){
    console.log("Reset Password");
    setDisabledBtn(true);
  }

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
              <InputField type="text" placeholder="Email" />
            </div>
            <SubmitButton text="Reset Password" onClick={resetPassword} disabled={disabledBtn}/>
          </div>
        {/* </div> */}
      </>
  );
}
