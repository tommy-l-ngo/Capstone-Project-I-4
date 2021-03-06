import "./Login.css";
//import UserStore from "../../stores/UserStore";
import React from "react";
import { observer } from "mobx-react";
import LoginPopup from "./LoginPopup";
import SubmitButton from "./SubmitButton";
import Forgot from "./Forgot";
import Register from "./Register";
import {
  Routes as Switch,
  Route,
  HashRouter as Router,
} from "react-router-dom";
import CreateProject from "../Create-project/CreateProject";
import EditProject from "../Create-project/EditProject";
import Tasks from "../Tasks-Page/Tasks";
import Home from "../Dashboard/pages/Home";
import RegisterAs from "./RegisterAs";
import HomeLoginPopup from "../Dashboard/pages/HomeLoginPopup";
import { HomeForgotPopup } from "../Dashboard/pages/HomeForgotPopup";
import { HomeRegisterAsPopup } from "../Dashboard/pages/HomeRegisterAsPopup";
import { HomeRegisterPopup } from "../Dashboard/pages/HomeRegisterPopup";
import { Calendar } from "../Calendar/Calendar";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { PasswordReset } from "./PasswordReset";
import { PageRedirect } from "./PageRedirect";
import { sendSignInLinkToEmail } from "@firebase/auth";
import ProjectPage from "../Projects/ProjectPage";
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
          <AuthProvider>
          <Router>
            <Switch>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} exact />
              <Route path="/Forgot" element={<HomeForgotPopup />} />
              <Route path="/Register" element={<HomeRegisterPopup />} />
              <Route path="/RegisterAs" element={<HomeRegisterAsPopup />} />
              <Route path="/PageRedirect" element={<PageRedirect />} />

              <Route path="/Login" element={<HomeLoginPopup />} exact />
              <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/CreateProject" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
              <Route path="/EditProject" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
              <Route path="/Calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/Projects/:id" exact element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
              <Route path="/Tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            </Switch>
          </Router>
          </AuthProvider>
        </div>
      </main>
    );
  }
}

export default observer(App);
