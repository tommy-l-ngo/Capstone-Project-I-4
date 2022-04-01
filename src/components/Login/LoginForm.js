import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";

import { getDatabase, get, ref, child, set } from "firebase/database";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RegisterAs from "./RegisterAs";
import Register from "./Register";
import {curPage, goToPage} from "./LoginPopup";
import back from "./back-button.png";
import { Form, Button, Card, Container } from "react-bootstrap";
import { fadeIn } from "../Dashboard/Navbar";

export const LoginForm = (props) => {


 const [, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);

 const [username, setUsername] = useState("");
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

  function handleLoginUser() {
    const dbRef = ref(getDatabase());

    get(child(dbRef, "users/" + username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //check password
          if (snapshot.child("password").val() === password) {
            console.log("Password Match");
            navigate("/Home");
          } else {
            invalidLoginMessageEmpty();
          }
        } else {
          invalidLoginMessage();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


var elmt2Render;

  useEffect(() => {
      // alert(3);

    // Update the document title using the browser API
    // if ()
    document.documentElement.style.setProperty("--loginFormHeight", "450px");
    document.documentElement.style.setProperty("--loginFormWidth", "350px");
    // alert (pageNum);
      if (pageNum == 0) {
        // alert(0);
        document.documentElement.style.setProperty(
          "--loginFormHeight",
          "450px"
        );
        document.documentElement.style.setProperty("--loginFormWidth", "350px");
      } else if (pageNum == 1) {
        document.documentElement.style.setProperty(
          "--loginFormHeight",
          "300px"
        );
      } else if (pageNum == 2) {
        document.documentElement.style.setProperty(
          "--loginFormHeight",
          "450px"
        );
        document.documentElement.style.setProperty("--loginFormWidth", "350px");
      } else if (pageNum == 3) {
        document.documentElement.style.setProperty(
          "--loginFormHeight",
          "250px"
        );
        document.documentElement.style.setProperty("--loginFormWidth", "350px");
      }
  });




  return (
    <>
      <div
        className=
        {fadeIn ? "loginForm2" : "loginForm1"}
      >
        {/* <Navi /> */}
        <h2 style={{ lineHeight: "0px" }}>Log In</h2>
        <InputField2
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e);
            clearErrorMessage();
          }}
        />
        <InputField
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e);
            clearErrorMessage();
          }}
        />
        {pageNum}
        <div className="forgotpass">
          <Link to={"/Forgot"}>Forgot Password</Link>
          {/* <a
            href="javascript:;"
            onClick={() => {
              // goToPage(3);
              setPageNum(3);
            }}
          >
            Forgot password
          </a> */}
        </div>{" "}
        <p
          id="errorMessage"
          style={{ marginTop: "10px", fontSize: "20px", color: "red" }}
        ></p>
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
          {/* <Link style={{ lineHeight: "22px" }} to={"/RegisterAs"}> */}
          {/* <a href="javascript:;" onClick={() => setPageNum(1)}> */}
          <Link to="/RegisterAs">Sign Up</Link>
          {/* </a> */}
          {/* </Link> */}
        </div>
        {/*<Link to={"/Register"}>Sign Up</Link>*/}{" "}
        {/*FIXME: change to React Link*/}
      </div>
    </>
  );
};
