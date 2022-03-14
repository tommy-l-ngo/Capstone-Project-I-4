import {React, Component} from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../../firebase";
import {getDatabase, set, ref } from "firebase/database";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router,Switch} from 'react-router-dom';

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
}
