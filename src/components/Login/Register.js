import React, {Component}  from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import "./Login.css";


export default class Register extends Component {
    
    constructor(props) {
        super(props);
      document.documentElement.style.setProperty("--loginFormHeight", "600px");
      document.documentElement.style.setProperty("--loginFormWidth", "500px");

        this.state = {
            department: "",
            eUID: "",
            userEmail: "",
            userFirstName: "",
            userLastName: "",
            userPassword: "",
            userPasswordConfirm: "",
            role: "",
            formErrors: {
                password: "",
                passwordConfirmation: "",
                euid: "",
            },
            passwordValid: false,
            euid: false,
            formValid: false
        };
    }

    newUser = () => {
        let errorMessage = "";
        if (this.state.department.length == 0) {
            errorMessage = "Please make sure you enter a deperament of study.";
        } else if (this.state.userEuid == 0) {
            errorMessage = "Please enter your euid."
        } else if (this.state.lastName == 0) {
            errorMessage = "Please enter your last name."
        } else if (this.state.firstName == 0) {
            errorMessage = "Please enter your first name."
        } else if (this.state.email < 6) {
            errorMessage = "Please enter an email."
        } else {
            const db = getDatabase();

            set(ref(db, "users/"), {
                department: this.state.department,
                eUID: this.state.userEuid,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                role: this.state.role
            })
                .then(() => {
                    this.props.history.push("/", { state: 'pass' })
                })
                .catch((e) => {
                    console.log("Data failed: " + e);
                });
        }

        let error = document.getElementById("errorMessage");
        error.textContent = errorMessage;
    }

    userInput = (e) => {

    }

    validForm() {
        this.setState({ formValid: ((this.state.euid !== undefined) && this.state.passwordValid) })
    }

    render() {
        return (
          <div>
            <Container className="d-flex align-item-center justify-content-center">
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="register">
                  <Card.Body>
                    <h2>Registration</h2>
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
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="Role">
                        <Form.Label htmlFor="userRole"></Form.Label>
                        <Form.Control
                          type="text"
                          id="userRole"
                          name="userRole"
                          placeholder="Role"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                    <h4 style={{ lineHeight: "0px", marginTop: "35px" }}>Register as</h4>
                    <div className="buttonsRegister">
                      <button
                        style={{ marginTop: "0px", marginBottom: "06px" }}
                        className="btn2"
                      >
                        Student
                      </button>
                      <button
                        style={{ marginTop: "6px", marginBottom: "06px" }}
                        className="btn2"
                      >
                        Advisor/Professor
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          </div>
        );
    }
}
