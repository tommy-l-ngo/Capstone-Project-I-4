import React, { createContext, useContext, useEffect, useState } from "react";
import InputField2 from "./InputField2";
import { Navi } from "./Navi";
import InputField3 from "./InputField3";
import SubmitButton from "./SubmitButton";
import { getDatabase, get, ref, child } from "firebase/database";

export default function Forgot() {
  //document.documentElement.style.setProperty("--loginFormHeight", "300px");
  let user = {
    eUID: "",
    email: "",
  };

  const [userEmail, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update the document title using the browser API
    document.documentElement.style.setProperty("--loginFormHeight", "250px");
    document.documentElement.style.setProperty("--loginFormWidth", "350px");
  });

  //const db = require("firebase");

  function HandleResetPass() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users"))
      .then((snapShot) => {
        let match = false;
        if (snapShot.exists()) {
          match = snapShot.forEach((curr) => {
            const ID = curr.ref._path.pieces_[1];
            //console.log(curr.ref._path.pieces_[1]);
            //console.log(snapShot.child(ID).child("email").val());
            let currEmail = snapShot.child(ID).child("email").val();
            //console.log(curr);
            //IDs.push(ID);

            if (currEmail === userEmail) {
              user = { eUID: ID, email: currEmail };
              return true;
            }
          });
          return match;
          //console.log(IDs);
          //console.log(userEmail);
        }
      })
      .then((match) => {
        try {
          if (!match) {
            throw Error("Email does not exist in system");
          }
          setError("");
        } catch (err) {
          console.log(err.code);
          setError(err.message);
        }
      });
  }

  return (
    <>
      {/* <div className="forgotContainer"> */}
      <div className="titleBar">
        <Navi destination="/Login" />
        <div className="titleText2">Forgot Password</div>
      </div>
      <div className="loginFormContentForgot">
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
        <div
          className="w-100 text-center mt-2 text-danger"
          id="errorMessage"
        ></div>

        <div className="emailInput">
          <InputField2
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e)}
          />
        </div>
        <SubmitButton text="Reset Password" onClick={HandleResetPass} />
      </div>
      {/* </div> */}
    </>
  );
}
