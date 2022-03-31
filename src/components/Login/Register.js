import React, { Component, useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { BrowserRouter as Router, Switch, Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import "./Login.css";
import { Navi } from "./Navi";
import "./RegisterAs";
//import {useLocation} from 'react-router-dom';

export default function Register() {
  // get role from previous page
  const location = useLocation();
  const data = location.state;
  console.log("role:", data.role);
  let placeholder = "";
  let regDesign = ""
  if (data.role == "student")
  {
    placeholder = "Major";
    regDesign = "RegisterFormContainerStudent";
  }
  else
  {
    placeholder = "Department Name";
    regDesign = "RegisterFormContainerStaff";
  }



  const [department, setDepartment] = useState("");
  const [userEUID, setUserEUID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassowrd, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState(data.role);
  const navigate = useNavigate();

  const [error, setError] = useState(null);



  function newUser() {
    try {
      if (department.length == 0) {

        throw Error('Please enter a deperament of study');
      }
      else if (userEUID == 0) {

        throw Error('Please enter your euid');
      }
      else if (userEmail == 0) {

        throw Error('Please enter a Email Address.');
      }
      else if (userEmail < 6) {

        throw Error('Please enter a valid Email Address.');
      }
      else if (userFirstName == 0) {

        throw Error('Please enter your first name.');
      }
      else if (userLastName == 0) {

        throw Error('Please enter your last name.');
      }
      else if (userPassowrd.length == 0) {
        throw Error('Please enter your Password ')
      }
      else if (userPassowrd.length < 8) {
        throw Error('Password must be at least 8 character')
      }
      else if (userPassowrd.search (/[0-9]/) == -1 ) {
        throw Error('Password must contain at least 1 number')
      }
      else if (userPassowrd.search (/[a-z]/) == -1 ) {
        throw Error('Password must contain at least 1 lower case letter')
      }
      else if (userPassowrd.search (/[A-Z]/) == -1 ) {
        throw Error('Password must contain at least 1 upper case letter')
      }
      
      
      else if (userPassowrd !== userConfirmPassword) {
        throw Error('Password does not match');
      }





      else {



        const db = getDatabase();

        set(ref(db, "users/" + userEUID), {
          department: department,
          eUID: userEUID,
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          password: userPassowrd,
          role: userRole
        });

        navigate("/");

        // .catch((error) => {
        //     console.log("Data failed: " + error);
        // });

      }
    }
    catch (err) {
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
    // Update the document title using the browser API
    document.documentElement.style.setProperty("--loginFormHeight", "480px");
    document.documentElement.style.setProperty("--loginFormWidth", "400px");
  });


  return (
    <div>
      <div className={regDesign}>
        <div className="titleBar">
          <Navi destination="/RegisterAs" />
          <div className="titleText">Registration</div>
        </div>
        <Container className="d-flex align-item-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="register">
              <Card.Body>
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
                    <Form.Control
                      type="text"
                      id="departmentName"
                      name="departmentName"
                      placeholder={placeholder}
                      required
                      onChange={(e) => setDepartment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="eUID">
                    <Form.Label htmlFor="userEUID"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userEUID"
                      name="userEUID"
                      placeholder="eUID"
                      required
                      onChange={(e) => setUserEUID(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="email">
                    <Form.Label htmlFor="userEmail"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userEmail"
                      name="userEmail"
                      placeholder="Email"
                      required
                      onChange={(e) => setUserEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="firstName">
                    <Form.Label htmlFor="userFirstName"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userFirstlName"
                      name="userFirstName"
                      placeholder="First Name"
                      required
                      onChange={(e) => setUserFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="lastName">
                    <Form.Label htmlFor="userLastName"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userLastlName"
                      name="userLastName"
                      placeholder="Last Name"
                      required
                      onChange={(e) => setUserLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="password">
                    <Form.Label htmlFor="userPassowrd"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userPassword"
                      name="userPassowrd"
                      placeholder="Password"
                      required
                      onChange={(e) => setUserPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="confirmPassword">
                    <Form.Label htmlFor="userConfirmPassword"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userConfirmPassword"
                      name="userConfirmPassword"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setUserConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  {data.role == "student" ? (
                    () => setUserRole(data.role)
                  ) : (
                    <Form.Group id="Role">
                      <Form.Label htmlFor="userRole"></Form.Label>
                      <select
                        name="userRole"
                        required
                        onChange={(e) => setUserRole(e.target.value)}
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
      </div>
    </div>
  );

}
