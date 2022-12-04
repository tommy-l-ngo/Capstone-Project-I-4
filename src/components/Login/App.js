import "./Login.css";
import React, {createContext} from "react";
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
import {EditProject} from "../Create-project/EditProject";
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
import { Todolist } from "../Todo/Todo-list";
import { AdminPage } from "../Admin/Admin";
import { ChatPage } from "../LiveChat/ChatPage";
import { MilestonesPage } from "../Milestones/Milestones";
import { CheckMessages } from "./CheckMessages";


export const MessageContext = createContext();

/* ------- Login Component -------- */
class App extends React.Component {

  state = {
    messageAlert: false
  }
  

  

  render() {

    const setMessageAlert = (alert) => {this.setState({...this.state, messageAlert: alert})}

    const value = [this.state.messageAlert, setMessageAlert];

    return (
      <main>
        <div className="App">
          <MessageContext.Provider value={value}>
            <CheckMessages/>
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
                    path="/Todo"
                    element={
                      <ProtectedRoute>
                        <Todolist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/Admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
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
                  <Route
                    path="/Chat"
                    element={
                      <ProtectedRoute>
                        <ChatPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/Milestones"
                    element={
                      <ProtectedRoute>
                        <MilestonesPage />
                      </ProtectedRoute>
                    }
                  />
                </Switch>
              </Router>
            </AuthProvider>
            </MessageContext.Provider>
        </div>
      </main>
    );
  }
}

export default observer(App);
