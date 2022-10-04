import "./Login.css";
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
import {CreateProject} from "../Create-project/CreateProject";
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
import { getAuth, sendSignInLinkToEmail } from "@firebase/auth";
import ProjectPage from "../Projects/ProjectPage";

/* ------- Login Component -------- */
class App extends React.Component {
  render() {
    return (
      <main>
        <div className="App">
          <AuthProvider>
            <Router>
              <Switch>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                  exact
                />
                <Route path="/Forgot" element={<HomeForgotPopup />} />
                <Route path="/Register" element={<HomeRegisterPopup />} />
                <Route path="/RegisterAs" element={<HomeRegisterAsPopup />} />
                <Route path="/PageRedirect" element={<PageRedirect />} />

                <Route path="/Login" element={<HomeLoginPopup />} exact />
                <Route
                  path="/Home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/CreateProject"
                  element={
                    <ProtectedRoute>
                      <CreateProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/EditProject"
                  element={
                    <ProtectedRoute>
                      <EditProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Calendar"
                  element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Projects/:id"
                  exact
                  element={
                    <ProtectedRoute>
                      <ProjectPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />
              </Switch>
            </Router>
          </AuthProvider>
        </div>
      </main>
    );
  }
}

export default observer(App);
