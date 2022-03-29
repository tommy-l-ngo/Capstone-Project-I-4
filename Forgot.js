import React, {useEffect} from 'react'
import InputField2 from './InputField2';
import { Navi } from "./Navi";
import SubmitButton from './SubmitButton';
export default function Forgot(){
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");
      useEffect(() => {
        // Update the document title using the browser API
        document.documentElement.style.setProperty(
          "--loginFormHeight",
          "290px"
        );
        document.documentElement.style.setProperty("--loginFormWidth", "400px");
      });
  
  return (
    <div>
      <div className="loginFormContainer">
        <div className="forgotContainer">
          <div className="titleBar">
            <Navi destination="/" />

            <div className="titleText3">Forgot Password</div>
          </div>
          <div className='loginFormContent'>
<div className="emailInput">
            <InputField2 type="text" placeholder="Email" />
          </div>
          <SubmitButton text="Reset Password" />
          </div>

          
        </div>
      </div>
    </div>
  );
}
