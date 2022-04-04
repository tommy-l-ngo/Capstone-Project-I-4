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
  useEffect(() => {
    // Update the document title using the browser API
    // fadeIn = false;
    setFade(false);
  });


  return (
    <div className={fadeIn ? "loginFormContainerFirst" : "loginFormContainer"}>
        <LoginForm />
    </div>
  );
}
