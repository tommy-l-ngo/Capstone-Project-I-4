import React, { Component } from "react";
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

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      date: new Date(),
      formValues: [{ tasks: "" }],
      students: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.add_project = this.add_project.bind(this);
  }

  add_project(project_name, project_description, project_tasks, project_date) {
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
            Student : ${students}
        `);

    this.add_project(
      this.state.projectName,
      this.state.description,
      this.state.task,
      this.state.date
    );
  }

  //handle change for project name and description
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //handle change for multiselect of students
  handleStudentsChange(listOfStudents) {
    this.setState({
      students: listOfStudents,
    });
  }
  //handle change for due date
  selectDate=(e)=>{
      this.setState({date:e})
  }
  //handle change for task field
  handleChanges(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }
  //function to add another task to fill out
  addFormFields() {
    this.setState({
      formValues: [...this.state.formValues, { tasks: "" }],
    });
  }
  //function to remove task 
  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  render() {
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
 
                <Form onSubmit={this.handleSubmit}> {/* line for handling submit action */}
                  {/* field for inputting project name */}
                  <Form.Group id="projectName">
                    <div className="form__group field">
                      <input
                        name="projectName"
                        id="projectName"
                        className="form__field"
                        type="text"
                        placeholder="Project Name"
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="description" className="form__label">
                        Description
                      </label>
                    </div>
                  </Form.Group>

                  {/* field for tasks */}
                  {this.state.formValues.map((element, index) => (
                    <div className="form-inline" key={index}>
                      <div className="form__group field">
                        <input
                          id="tasks"
                          name="tasks"
                          className="form__field"
                          placeholder="Task"
                          value={element.tasks || ""}
                          onChange={(e) => this.handleChanges(index, e)}
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
                          onClick={() => this.removeFormFields(index)}
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
                      onClick={() => this.addFormFields()}
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
                      selected={this.state.date}
                      onChange={this.selectDate}
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
                    onChange={this.handleStudentsChange.bind(this)}
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
  }
}

