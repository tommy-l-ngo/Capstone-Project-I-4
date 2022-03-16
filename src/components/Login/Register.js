import {React, Component} from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";
import {getDatabase, set, ref } from "firebase/database";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router,Switch} from 'react-router-dom';
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";


export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            userFullName: "",
            userEuid: "",
            userDOB: "",
            userPassword: "",
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
            <div className="loginForm">
                {console.log('hi')}
                <h3 style={{lineHeight:'0px'}}>Register as</h3>
                <button style={{marginTop: '6px', marginBottom: '20px'}} className="btn">Student</button>
                <button className="btn">Advisor/Professor</button>
            </div>
        )
    }
}
