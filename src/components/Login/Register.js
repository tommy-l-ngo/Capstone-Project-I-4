import"./register.css"
import {React, Component} from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";
import {getDatabase, set, ref } from "firebase/database";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router,Switch} from 'react-router-dom';
import InputFieldFname from "./InputFieldFname";
import InputFieldEmail from "./InputFieldEmail";
import InputFieldIname from "./InputFieldIname";
import InputFieldLname from "./InpurtFieldLname";
import InputFieldPassword from "./InputFieldPassword";


export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            institutionName: "",
            firstName: "",
            lastname: "",
            emal: "",
            password:"",
            buttonDisable: false
        };
    }

    newUser = () => {
        let errorMessage = "";
        if (this.state.userFullName.length == 0 && this.state.userEuid < 6) {
            errorMessage = "Please enter your full Name and EUID";
        } else {
            const db = getDatabase();

            set(ref(db, "users/" + this.state.userEuid), {
                eUID: this.state.userEuid
            })
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="register">
                    <b>Sign Up</b>
                    <InputFieldIname
                        type="text"
                        placeholder="Institution Name"
                        
                    />
                    <InputFieldFname
                        type="text"
                        placeholder="First Name"
                    />
                    <InputFieldLname
                        type="text"
                        placeholder="Last Name"
                    />
                    <InputFieldEmail
                        type="email"
                        placeholder="Email"
                    />

                    <InputFieldPassword
                        type="password"
                        placeholder="Password"
                    />

                </div>
            </div>
        );
    }
}
