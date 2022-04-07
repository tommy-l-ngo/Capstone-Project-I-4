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

export var userGlobal;

export function getUserGlobal() {
  return userGlobal;
}
export function setUserGlobal(e) {
  userGlobal = e;
}
export const LoginForm = (props) => {
  const auth = getAuth(); // Firebase auth

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(""); // Firebase user auth
  const [password, setPassword] = useState("");
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

  //console.log(window.location.href);

  function handleLoginUser() {
    // alert("hi");
    // alert(username +', ' + password);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        userGlobal = userCredential.user;

        //console.log("userCredential.user = " + userCredential.user);
        //console.log("user = " + user);
        //console.log("userGlobal = " + userGlobal);

        //sendEmailVerification(userCredential.user);
        navigate("/");
        // alert("Logged in " + userCredential.user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });

    // const dbRef = ref(getDatabase());

    // get(child(dbRef, "users/" + username))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       //check password
    //       if (snapshot.child("password").val() === password) {
    //         console.log("Password Match");
    //         navigate("/Home");
    //       } else {
    //         invalidLoginMessageEmpty();
    //       }
    //     } else {
    //       invalidLoginMessage();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
      <div className={fadeIn ? "loginForm2" : "loginForm1"}>
        <h2 style={{ lineHeight: "0px" }}>Log In</h2>

        <div className="inputField2">
          <div className="form__group field">
            <input
              name="user"
              id="user"
              className="form__field"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                clearErrorMessage();
              }}
            />
            <label for="user" class="form__label">
              Username
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
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrorMessage();
              }}
            />
            <label for="pass" class="form__label">
              Password
            </label>
          </div>
        </div>

        {/* <InputField
          type="text"
          id="user"
          name="user"
          // placeholder="Username"
          onChange={(e) => {
            setUsername(e);
            clearErrorMessage();
          }}
        />
        <label for="user" class="form__label">
          Username
        </label>
        <InputField
          type="password"
          name="pass"
          // placeholder="Password"
          onChange={(e) => {
            setPassword(e);
            clearErrorMessage();
          }}
        /> */}
        <div className="forgotpass">
          <Link to={"/Forgot"}>Forgot Password</Link>
        </div>
        <p
          id="errorMessage"
          style={{ marginTop: "10px", fontSize: "20px", color: "red" }}
        ></p>
        <SubmitButton
          text="Log in"
          disabled={buttonDisabled}
          onClick={handleLoginUser}
          style={{ fontSize: "20px" }}
        />
        <p style={{ marginBottom: "0px", fontSize: "20px" }}>
          Don't have an account?
        </p>
        <div className="registerLink">
          <Link to="/RegisterAs">Sign Up</Link>
        </div>
      </div>
    </>
  );
};
