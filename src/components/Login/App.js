import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React from "react";
import { observer } from 'mobx-react';
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import { Forgot }  from "./Forgot";
import Register from "./Register";
import {Routes as Switch, Route, HashRouter as Router} from "react-router-dom";



class App extends React.Component {
  /*
  App2() {
    return (
        <Router>
        <div>
            <Routes>
            <Route path="/Register" element={<Register/>} />
            </Routes>
        </div>
        </Router>
        );
  }
  */
  /*
  async doLogOut() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {

          'Accept': "application/json",
          'Content-Type': "application/json"
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json"
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  */

  render() {
    /*
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading...</div>
        </div>
      );
    } else {

      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Logged in as {UserStore.username}
              <SubmitButton text={'Log Out'} disabled='false' onClick={() => this.doLogOut()} />
            </div>
          </div>
        );
      }
      */
      return (
        <main> 

          <div className="App">
            <div className="loginFormContainer">
            <Router>
              <Switch>
                <Route path="/" element={<LoginForm/>} exact/>
                <Route path="/Forgot" element={<Forgot/>} />
                <Route path="/Register" element={<Register/>} />
              </Switch>
            </Router>
            </div>
          </div>
        </main>
        
      );
    }
  }

export default observer(App);
