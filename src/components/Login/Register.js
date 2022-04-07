import React, { Component, useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";

import { getDatabase, set, ref } from "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPopup from "./LoginPopup";
import SubmitButton from "./SubmitButton";
import "./Login.css";
import { Navi } from "./Navi";
import "./RegisterAs";
import InputField2 from "./InputField2";
import InputField3 from "./InputField3";
import InputField from "./InputField";

export default function Register(props) {
  // Firebase auth
  const auth = getAuth();
  const location = useLocation();
  const data = location.state;
  // get role from previous page
  console.log("role:", data.role);
  let placeholder = "";
  let regDesign = "";
  if (data.role == "student") {
    placeholder = "Major";
    regDesign = "RegisterFormContainerStudent";
  } else {
    placeholder = "Department Name";
    regDesign = "RegisterFormContainerStaff";
  }

  const [success, setSuccess] = useState(false);

  const [department, setDepartment] = useState("");

  const [user, setUser] = useState("");
  const [userEUID, setUserEUID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState(data.role);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  function newUser() {
    try {
      if (department.length == 0 && userRole !== "student") {
        throw Error("Please enter a deperament of study");
      } else if (userEUID == "") {
        throw Error("Please enter your euid");
      } else if (userEmail == 0) {
        throw Error("Please enter a Email Address.");
      } else if (userEmail < 6) {
        throw Error("Please enter a valid Email Address.");
      } else if (userFirstName == 0) {
        throw Error("Please enter your first name.");
      } else if (userLastName == 0) {
        throw Error("Please enter your last name.");
      } else if (userPassword.length == 0) {
        throw Error("Please enter your Password ");
      } else if (userPassword.length < 8) {
        throw Error("Password must be at least 8 character");
      } else if (userPassword.search(/[0-9]/) == -1) {
        throw Error("Password must contain at least 1 number");
      } else if (userPassword.search(/[a-z]/) == -1) {
        throw Error("Password must contain at least 1 lower case letter");
      } else if (userPassword.search(/[A-Z]/) == -1) {
        throw Error("Password must contain at least 1 upper case letter");
      } else if (userPassword !== userConfirmPassword) {
        throw Error("Password does not match");
      } else {
        const db = getDatabase();

        // Create User via Firebase
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
          .then((userCredential) => {
            // Signed in
            setUser(userCredential.user);
            sendEmailVerification(userCredential.user).then( () => {
              console.log("Verification Email Sent");
              setError("");
              setSuccess(true);

            }
            ).catch((err) => {
              console.log(err.message);
              setError(err.message);
            })

            set(ref(db, "users/" + userEUID), {
              uid: user.uid,
              department: department,
              eUID: userEUID,
              email: userEmail,
              firstName: userFirstName,
              lastName: userLastName,
              password: userPassword,
              role: userRole,
            });

            // alert("Created " + user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });


          // Add user to realtime database
        

        //navigate("/");

        // .catch((error) => {
        //     console.log("Data failed: " + error);
        // });
      }
    } catch (err) {
      console.log(err.code);
      setError(err.message);
    }

    //let error = document.getElementById("errorMessage");
    //error.textContent = errorMessage;
  }

  /*
  userInput = (e) => {

  }
  

  validForm() {
      this.setState({ formValid: ((this.state.euid !== undefined) && this.state.passwordValid) })
  }
  */
  // {}
  /*
        if(isStudent == true)
        {
          this.deptOrMaj = "Major";
          this.showRole = false;
        }
        else
        {
          this.deptOrMaj = "Department Name";
          this.showRole = true;
        }
        */

  useEffect(() => {
    // Update popup height
    if (userRole == "student")
      document.documentElement.style.setProperty("--loginFormHeight", "650px");
    else
      document.documentElement.style.setProperty("--loginFormHeight", "680px");
  });

  return (
    <div>
      {(!success) && (
        <>
          <div className="titleBar">
          <Navi destination="/Login" />
          <div className="titleText">Registration</div>
        </div>
        <Container className="d-flex align-item-center justify-content-center">
          <div
            className="w-100"
            // style={{ maxWidth: "400px" }}
          >
            <Card className="register">
              <Card.Body style={{ width: "100%" }}>
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
  
                <Form>
                  <Form.Group id="department">
                    <Form.Label htmlFor="departmentName"></Form.Label>
                    <InputField3
                      // type="text"
                      id="departmentName"
                      name="departmentName"
                      placeholder={placeholder}
                      onChange={(e) => setDepartment(e)}
                    />
  
                    {/* </Form.Control> */}
                  </Form.Group>
  
                  <Form.Group id="eUID">
                    <Form.Label htmlFor="userEUID"></Form.Label>
                    <InputField3
                      type="text"
                      id="userEUID"
                      name="userEUID"
                      placeholder="eUID"
                      onChange={(e) => {
                        // alert(e);
                        setUserEUID(e);
                      }}
                    />
                  </Form.Group>
  
                  <Form.Group id="email">
                    <Form.Label htmlFor="userEmail"></Form.Label>
                    <InputField3
                      type="text"
                      id="userEmail"
                      name="userEmail"
                      placeholder="Email"
                      required
                      onChange={(e) => setUserEmail(e)}
                    />
                  </Form.Group>
  
                  <Form.Group id="firstName">
                    <Form.Label htmlFor="userFirstName"></Form.Label>
                    <InputField3
                      type="text"
                      id="userFirstlName"
                      name="userFirstName"
                      placeholder="First Name"
                      required
                      onChange={(e) => setUserFirstName(e)}
                    />
                  </Form.Group>
  
                  <Form.Group id="lastName">
                    <Form.Label htmlFor="userLastName"></Form.Label>
                    <InputField3
                      type="text"
                      id="userLastlName"
                      name="userLastName"
                      placeholder="Last Name"
                      required
                      onChange={(e) => setUserLastName(e)}
                    />
                  </Form.Group>
  
                  <Form.Group id="password">
                    <Form.Label htmlFor="userPassowrd"></Form.Label>
                    <InputField3
                      type="password"
                      id="userPassword"
                      name="userPassowrd"
                      placeholder="Password"
                      required
                      onChange={(e) => setUserPassword(e)}
                    />
                  </Form.Group>
  
                  <Form.Group id="confirmPassword">
                    <Form.Label htmlFor="userConfirmPassword"></Form.Label>
                    <InputField3
                      type="password"
                      id="userConfirmPassword"
                      name="userConfirmPassword"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setUserConfirmPassword(e)}
                    />
                  </Form.Group>
                  {data.role == "student" ? (
                    () => setUserRole(data.role)
                  ) : (
                    <Form.Group id="Role">
                      <Form.Label htmlFor="userRole"></Form.Label>
                      <select
                        name="userRole"
                        required
                        onChange={(e) => setUserRole(e)}
                      >
                        <option value="" selected disabled hidden>
                          Select Role
                        </option>
                        <option value="professor">Professor</option>
                        <option value="advisor">Advisor</option>
                      </select>
                    </Form.Group>
                  )}
                </Form>
              </Card.Body>
              <SubmitButton text="Submit" onClick={newUser} />
            </Card>
          </div>
        </Container>
        {/* </div> */}
        </>
      )}

      {success && 
        (<p
        style={{
          fontSize: "20px",
          color: "Green",
        }}
      >
        Verification Email Sent! Check inbox.
      </p>)}
      
    </div>
  );
}
