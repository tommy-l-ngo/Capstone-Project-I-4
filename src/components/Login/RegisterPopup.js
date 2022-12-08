import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import { getDatabase, get, ref, child } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import RegisterAsPopup from "./RegisterAsPopup";
import Register from "./Register";
import { LoginForm } from "./LoginForm";
import { fadeIn, setFade } from "../Dashboard/Navbar";


export const RegisterPopup = () => {
  return <div className="RegisterPopupContainer">
      <Register />
  </div>;
};
