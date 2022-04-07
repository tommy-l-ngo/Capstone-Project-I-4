import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import InputField3 from "./InputField3";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import { getDatabase, get, ref, child, set } from "firebase/database";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RegisterAs from "./RegisterAs";
import Register from "./Register";
import { curPage, goToPage } from "./LoginPopup";
import back from "./back-button.png";
import { Form, Button, Card, Container } from "react-bootstrap";
import { fadeIn } from "../Dashboard/Navbar";


export function PasswordReset(props){
  const auth = getAuth(); // Firebase auth

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled] = useState(false);
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(props.pageNumber);
  var register;

  

  function clearErrorMessage() {
    var error = document.getElementById("errorMessage");
    error.textContent = "";
  }

  function invalidLoginMessage() {
    var error = document.getElementById("errorMessage");
    error.textContent = "Invalid Login";
    console.log("Invalid Login");
  }
  function invalidLoginMessageEmpty() {
    var error = document.getElementById("errorMessage");
    error.textContent = "Username and Password are required";
    console.log("Username and Password are required");
  }

  


  function HandleResetPass() {
    try {
        if (password.length == 0) {
        throw Error("Please enter your Password ");
      } 
      else if (password.length < 8) {
        throw Error("Password must be at least 8 character");
      } 
      else if (password.search(/[0-9]/) == -1) {
        throw Error("Password must contain at least 1 number");
      } 
      else if (password.search(/[a-z]/) == -1) {
        throw Error("Password must contain at least 1 lower case letter");
      } 
      else if (password.search(/[A-Z]/) == -1) {
        throw Error("Password must contain at least 1 upper case letter");
      } 
      else if (password !== confirmPassword) {
        throw Error("Password does not match");
      } 
      else {
        const url = window.location.href;
        const reg = /Code=(.+)/;
        try{
            const m = url.match(reg);
            if(m == null){
                throw Error("regex match failed");
            }
            
            const code = m[1];
        }
        catch(err)
        {
            console.log(err.message);
        }
      }
    } catch (err) {
      console.log(err.code);
      setError(err.message);
    }

    //let error = document.getElementById("errorMessage");
    //error.textContent = errorMessage;
  }  

 



   

  useEffect(() => {
    // alert(3);

    // Update the document title using the browser API
    // if ()
    document.documentElement.style.setProperty("--loginFormHeight", "450px");
    document.documentElement.style.setProperty("--loginFormWidth", "350px");

    document.body.style.overflowY = "hidden";
  });

  return (
    <>
      <div className="passResetFormContainer">
        <h2 style={{ lineHeight: "40px", fontSize:"36px" }}>Password Reset</h2>

        {error && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "20px",
              color: "red",
            }}
          >
            {error}
          </p>
        )}

        <div className="inputField2">
          <div className="form__group field">
            <input
              name="user"
              id="user"
              className="form__field"
              type="text"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrorMessage();
              }}
            />
            <label for="user" class="form__label">
              New Password
            </label>
          </div>
        </div>

        <div className="inputField">
          <div className="form__group field">
            <input
              name="pass"
              id="pass"
              className="form__field"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearErrorMessage();
              }}
            />
            <label for="pass" class="form__label">
              Confirm Password
            </label>
          </div>
        </div>
        
        <p
          id="errorMessage"
          style={{ marginTop: "10px", fontSize: "20px", color: "red" }}
        ></p>
        <SubmitButton
          text="Reset Passowrd"
          disabled={buttonDisabled}
          onClick={HandleResetPass}
          style={{ fontSize: "20px" }}
        />
      </div>
    </>
  );
};
