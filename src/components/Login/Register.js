import React, { Component, useState } from "react";
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
      else if (userPassowrd.length < 6) {
        throw Error('Password must be at least 6 character')
      }
      else if (userPassowrd.length == 0) {
        throw Error('Please enter your Password ')
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
  return (
    <div>

      <div className="loginFormContainer">
        <Navi />
        <Container className="d-flex align-item-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="register">
              <Card.Body>
                {error && <p style={{ marginTop: "10px", fontSize: "20px", color: "red" }}>{error}</p>}



                <div className="titleText">Registration</div>
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
                      placeholder="Department Name"
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

                  <Form.Group id="Role">
                    <Form.Label htmlFor="userRole"></Form.Label>
                    <Form.Control
                      type="text"
                      id="userRole"
                      name="userRole"
                      placeholder={data.role}
                      disabled="true"
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Button onClick={newUser}>Submit</Button>
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );

}
