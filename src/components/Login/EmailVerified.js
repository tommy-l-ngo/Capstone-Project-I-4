import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";



export const EmailVerified = (props) => {

    let navigate = useNavigate();
    const [validUrl, setValidUrl] = useState(false);
    const [error, setError] = useState("");

    useEffect( () => {
        //console.log("props.url = " + props.url);
        const url = props.url;
        const reg = /Code=(.+)&api/;
        try{
            const m = url.match(reg);
            if(m == null){
                throw Error();
            }
            setValidUrl(true);
            setError("");
            setTimeout( () => {
                navigate("/Home");
            }, 3000);
            
        }
        catch(err)
        {
            err.message = "Invalid url link. Nice try.";
            console.log(err.message);
            setValidUrl(false);
            setError(err.message);
        }
    })
 
  return(
    <>
        {validUrl ? 
        (
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
        )
    :
    (
        <div className="loginFormContainer">
            <p
                style={{
                fontSize: "20px",
                color: "Red",
                }}
            >
                {error}
            </p>
        </div>
    )}
    
  </>
  );
};
