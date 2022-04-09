import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";




export const EmailVerified = (props) => {
    
    let navigate = useNavigate();
    useEffect( () => {
        setTimeout(() => {
            navigate("/Home");
        }, 3000);
    });

  return(
    <>
        <div className="loginFormContainer">
            <p
                style={{
                fontSize: "20px",
                color: "Green",
                }}
            >
                Email Verified Successfully! Redirecting...
            </p>
        </div>
    
  </>
  );
};
