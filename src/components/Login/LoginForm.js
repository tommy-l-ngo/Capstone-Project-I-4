import "./Login.css";
import UserStore from "../../stores/UserStore";
import React from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import { getDatabase, get, ref, child} from "firebase/database";
import {Link} from 'react-router-dom';

const dbRef = ref(getDatabase());

get(child(dbRef, "users/" + "test0123")).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 12){
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin() {

        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        this.setState({buttonDisabled:true})

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }

            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }
  render() {
    return (
        <div classname="container">
      <div className="loginForm">
        <b>Log In</b>
        <InputField2
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <a href=''>Forgot Password</a> {/*FIXME: change to React Link*/}
        <SubmitButton text="Log in"
            disabled={this.state.buttonDisabled}
            onClick={ () => this.doLogin() } 
        />
        <p style={{marginBottom: '0px'}}>Don't have an account?</p>
        {/*<li><Link to={"/Register"}>Sign Up</Link></li>*/}{/*Can't get this to work*/}
        <a href=''>Sign Up</a> {/*FIXME: change to React Link*/}
      </div>
      </div>
    );
  }
}

export default LoginForm;
