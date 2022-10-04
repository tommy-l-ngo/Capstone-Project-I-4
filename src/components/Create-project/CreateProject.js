import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./CreateProject.css";
import "../Login/Login.css";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import MultiSelect from "./MultiSelect";
import Navbar from "../Dashboard/Navbar";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu1kdEKPqTfL1XIjDF2l8rfG53FcdtVSM",
  authDomain: "capstone-i4.firebaseapp.com",
  databaseURL: "https://capstone-i4-default-rtdb.firebaseio.com",
  projectId: "capstone-i4",
  storageBucket: "capstone-i4.appspot.com",
  messagingSenderId: "768427043765",
  appId: "1:768427043765:web:6643185734fe346ddd07fc",
  measurementId: "G-X8E63KZMT3",
};

export function CreateProject(props)
{
      const [projInfo, setProjInfo] = useState({
        projectName: "",
        description: "",
        date: new Date(),
        formValues: [{ tasks: "" }],
        students: null,
      });

  add_project(project_name, project_description, project_tasks, project_date,students) {
    // get current user details from auth
    const user = getAuth().currentUser;
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
        const email = user.email;
        const displayName = user.displayName; // (euid)
    }
    else
    {
        // get current user details from auth
        const user = getAuth().currentUser;
        if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
            const email = user.email;
            const displayName = user.displayName; // (euid)
        }
        else
        {
            console.log("No User");
        }
        const db = getDatabase();
        set(ref(db, "projects/" + project_name), {
          user_id: user.displayName,
          description: project_description,
          //tasks: project_tasks,
          date: project_date,
        });
        console.log("after adding to db");
    }
    const db = getDatabase();
    set(ref(db, "projects/" + project_name), {
      name: project_name,
      user_id: user.displayName,
      description: project_description,
      tasks: project_tasks,
      date: project_date,
    });
  }

  handleSubmit(event) {
    const { projectName, description, task, date, students } = this.state;
    event.preventDefault();
    alert(JSON.stringify(this.state.formValues));
    alert(`
            ____Your Details____\n
            Project : ${projectName}
            Description : ${description}
            Task : ${task}
            Date : ${date}
            Student : ${JSON.stringify(students)}
        `);

    this.add_project(
      this.state.projectName,
      this.state.description,
      this.state.task,
      JSON.stringify(this.state.date),
      JSON.stringify(this.state.students)
    );
  }

      function handleChange(event) {
        let updatedValue = {[event.target.name]: event.target.value};
        setProjInfo({...projInfo, ...updatedValue});
      }

      function handleStudentsChange(listOfStudents) {
        let updatedValue = {students: listOfStudents};
        setProjInfo({...projInfo, ...updatedValue});
      }

      function selectDate(e){
        let updatedValue = {date:e};
        setProjInfo({...projInfo, ...updatedValue});
        }

       function handleChanges(i, e) {
            let formValues = projInfo.formValues;
            formValues[i][e.target.name] = e.target.value;
            setProjInfo({ formValues });
            //this.props.push()
          }

         function addFormFields() {
            setProjInfo({
              formValues: [...projInfo.formValues, { tasks: "" }],
            });
          }

        function removeFormFields(i) {
            let formValues = projInfo.formValues;
            formValues.splice(i, 1);
            setProjInfo({ formValues });
          }

            return (
              <div>
                <Navbar />
                <div className="cp-box">
                  {/* <Container className="d-flex align-item-center justify-content-center cp-box"> */}
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className="createProject">
                      <Card.Body>
                        <h1>Create Project</h1>
                        <div
                          className="w-100 text-center mt-2 text-danger"
                          id="errorMessage"
                        ></div>
                        <h3 style={{ lineHeight: "0px" }}></h3>
         
                        <Form onSubmit={handleSubmit}> {/* line for handling submit action */}
                          {/* field for inputting project name */}
                          <Form.Group id="projectName">
                            <div className="form__group field">
                              <input
                                name="projectName"
                                id="projectName"
                                className="form__field"
                                type="text"
                                placeholder="Project Name"
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="projectName" className="form__label">
                                Project Name
                              </label>
                            </div>
                          </Form.Group>
        
                          {/* field for description */}
                          <Form.Group id="description">
                            <div className="form__group field">
                              <input
                                id="description"
                                name="description"
                                className="form__field"
                                placeholder="Description"
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="description" className="form__label">
                                Description
                              </label>
                            </div>
                          </Form.Group>
        
                          {/* field for tasks */}
                          {projInfo.formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                              <div className="form__group field">
                                <input
                                  id="tasks"
                                  name="tasks"
                                  className="form__field"
                                  placeholder="Task"
                                  value={element.tasks || ""}
                                  onChange={(e) => handleChanges(index, e)}
                                />
                                <label htmlFor="tasks" className="form__label">
                                  Task (Optional)
                                </label>
                              </div>
                              {/* ability to remove task */}
                              {index ? (
                                <button
                                  type="button"
                                  className="button remove"
                                  onClick={() => removeFormFields(index)}
                                >
                                  Remove
                                </button>
                              ) : null}
                            </div>
                          ))}
                          {/* ability to add tasks */}
                          <div className="button-section">
                            <button
                              className="button add"
                              type="button"
                              onClick={() => addFormFields()}
                            >
                              Add
                            </button>
                          </div>
                          
                          {/* field for due date */}
                          <Form.Group id="date">
                            <div className="form__group field">
                              <DatePicker /* using datepicker for selecting duedate from calendar */
                              id="date"
                              name="date"
                              className="form__field"
                              selected={projInfo.date}
                              onChange={selectDate}
                              />
                              <label htmlFor="date" className="form__label">
                                Due Date
                              </label>
                            </div>
                          </Form.Group>
                          
                          {/* field for selecting students to add */}
                          <Form.Group id="students">
                            <div className="form__group field">
                          <MultiSelect
                            onChange={handleStudentsChange}
                          />
                          <label htmlFor="students" className="form__label">
                                Add student(s) to project
                              </label>
                          </div>
                          </Form.Group>
        
                          <Button type="submit">Submit</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                  {/* </Container> */}
                </div>
              </div>
            ); 

                  <Button type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          {/* </Container> */}
        </div>
      </div>
    );
  }
}

