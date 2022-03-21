import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React from "react";
import InputField from "./InputField";
import InputField2 from "./InputField2";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import { getDatabase, get, ref, child } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import { Navi } from "./Navi";


// function goToPage(i) {
//   if (i==2) {
//   document.documentElement.style.setProperty("--loginFormHeight", "300px");
//   }
//   else if (i==0) {
//   document.documentElement.style.setProperty("--loginFormHeight", "500px");

//   }
//   else 
//     document.documentElement.style.setProperty("--loginFormHeight", "500px");

// }
export default class LoginForm extends React.Component {
  goToPage = (i) => {
    if (i == 2) {
      document.documentElement.style.setProperty("--loginFormHeight", "300px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");
    } else if (i == 1) {
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");

    } 
     else if (i == 0) {
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
      document.documentElement.style.setProperty("--loginFormWidth", "400px");
    } else
      document.documentElement.style.setProperty("--loginFormHeight", "500px");
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
      tab: 0,
    };
    this.goToPage(0);
  }

  handleLoginUser = () => {
    const dbRef = ref(getDatabase());
    let navigate = useNavigate(); // FIX ME
    get(child(dbRef, "users/" + this.state.username))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //check password
          if (snapshot.child("password").val() === this.state.password) {
            console.log("Password Match");
            navigate("/Register"); //FIX ME
          }
        } else {
          console.log("Login credentials incorrect");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 16) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }
  /*
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

    this.setState({ buttonDisabled: true })

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
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }
  */

  render() {
    return (
      <div className="container">
        <div className="loginForm1">
          {/* <Navi /> */}
          <h2 style={{ lineHeight: "0px" }}>Log In</h2>
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
          <div className="forgotpass">
            <Link
              to={"/Forgot"}
              onClick={() => {
                this.goToPage(2);
              }}
            >
              Forgot Password
            </Link>
          </div>{" "}
          {/*FIXME: change to React Link*/}
          <SubmitButton
            text="Log in"
            disabled={this.state.buttonDisabled}
            onClick={this.handleLoginUser}
          />
          <p style={{ marginBottom: "0px", fontSize: "20px" }}>
            Don't have an account?
          </p>
          <div className="registerLink">
            <Link style={{ lineHeight: "22px" }} to={"/Register"}>
              Sign Up
            </Link>
          </div>
          {/*<Link to={"/Register"}>Sign Up</Link>*/}{" "}
          {/*FIXME: change to React Link*/}
        </div>
      </div>
    );
  }
}
