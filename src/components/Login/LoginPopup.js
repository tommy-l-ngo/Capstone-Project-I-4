import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import { getDatabase, get, ref, child } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import RegisterAs from "./RegisterAs";
import Register from "./Register";
import { LoginForm } from "./LoginForm";
import { fadeIn, setFade } from "../Dashboard/Navbar";
//import { Navi } from "./Navi";

export default function LoginPopup() {
  var fadeInCopy = fadeIn;
  // fadeIn = false;
  var cName = "loginFormContainerFirst";
  useEffect(() => {
    // Update the document title using the browser API
    // fadeIn = false;
    if (fadeIn == true) {
      cName = "loginFormContainerFirst";
      // alert("t,"+cName);
    }
    else {
      cName = "loginFormContainer";
      // alert("f,"+cName);
    }
    setFade(false);
  });


  return (
    <div className={fadeIn ? "loginFormContainerFirst" : "loginFormContainer"}>
      <div
        className={fadeIn ? "containerFirst" : "container"}
      >
        <LoginForm />
        {/* {pageContent} */}
      </div>
    </div>
  );
}
