import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import { getDatabase, get, ref, child } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
//import { Navi } from "./Navi";

export default function LoginForm(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [buttonDisabled] = useState(false);
  const navigate = useNavigate();

  function goToPage(i) {
    if (i == 2) {
      document.documentElement.style.setProperty("--loginFormHeight", "300px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");
    } else if (i == 1) {
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");

    } 
     else if (i == 0) {
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");
    } else
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
  };

  function clearErrorMessage() {
    var error = document.getElementById("errorMessage");
    error.textContent = "";
  }

  function invalidLoginMessage(){
    var error = document.getElementById("errorMessage");
    error.textContent = "Invalid Login";
    console.log("Invalid Login");
  }
  function invalidLoginMessageEmpty(){
    var error = document.getElementById("errorMessage");
    error.textContent = "Username and Password are required";
    console.log("Username and Password are required");
  }

  function handleLoginUser(){
    const dbRef = ref(getDatabase());
    
    get(child(dbRef, "users/" + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //check password
          if (snapshot.child("password").val() === password) {
            console.log("Password Match");
            navigate("/Home"); 
          }
          else {
            invalidLoginMessageEmpty();
          }
        } else {
          invalidLoginMessage();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


    useEffect(() => {
      // Update the document title using the browser API
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");
    });

  
    return (
      <div className="loginFormContainer">
      <div className="container">
        <div className="loginForm1">
          {/* <Navi /> */}
          <h2 style={{ lineHeight: "0px" }}>Log In</h2>
          <InputField2
            type="text"
            placeholder="Username"
            
            onChange={(e) => {setUsername(e); clearErrorMessage();}}
          />
          <InputField
            type="password"
            placeholder="Password"
            
            onChange={(e) => {setPassword(e); clearErrorMessage();}}
          />
          <div className="forgotpass">
            <Link
              to={"/Forgot"}
              onClick={goToPage(2)}
            >
              Forgot Password
            </Link>
          </div>{" "}
          <p id="errorMessage" style={{ marginTop: "10px", fontSize: "20px", color:"red" }}>
          </p>
          {/*FIXME: change to React Link*/}
          <SubmitButton
            text="Log in"
            disabled={buttonDisabled}
            onClick={handleLoginUser}
          />
          <p style={{ marginBottom: "0px", fontSize: "20px" }}>
            Don't have an account?
          </p>
          <div className="registerLink">
            <Link style={{ lineHeight: "22px" }} to={"/RegisterAs"}>
              Sign Up
            </Link>
          </div>
          {/*<Link to={"/Register"}>Sign Up</Link>*/}{" "}
          {/*FIXME: change to React Link*/}
        </div>
      </div>
      </div>
    );
  
}
