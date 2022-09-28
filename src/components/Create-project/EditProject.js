import { getDatabase, update } from "firebase/database";
import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import firebase from "firebase/compat/app";
import { ref, set } from "firebase/database";
import "./CreateProject.css";
import { initializeApp } from "firebase/app";
import Navbar from "../Dashboard/Navbar";
import MultiSelect from "./MultiSelect";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import data from '../Dashboard/data';

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

export default class EditProject extends Component { // sets all feilds to blank
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      description: "",
      task: "",
      date: new Date(),
      formValues: [{ tasks: "" }],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit_project = this.edit_project.bind(this);
  }
  edit_project(project_name, project_description, project_tasks, project_date) { //updates inputted fields to database
    const db = getDatabase();
    set(ref(db, "projects/" + project_name), {
      description: project_description,
      tasks: project_tasks,
      date: project_date,
    });
  }

  handleSubmit(event) {//this will handle what happens whne the submit button is pressed
    const { projectName, description, task, date } = this.state;
    event.preventDefault();
    alert(JSON.stringify(this.state.formValues));// displays all inputted values
    alert(`
            ____Your Details____\n
            Title : ${projectName}
            Description : ${description}
            Task : ${task}
            Date : ${date}
        `);
    this.edit_project( //puts inputted values to database
      this.state.projectName,
      this.state.description,
      this.state.task,
      this.state.date
    );
  }

  //handle change for project name and description
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
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
  /*
  componentDidMount(x) {
    const { id } = this.props.match.params;
    this.fetchData(id);
    //Gets data based on project Id
    const getData = data.cardData[id - 1];
    console.warn(getData);
  }*/
  
  render() {
    return (
      <div>
        <Navbar />
        <div className="cp-box">
          {/* <Container className="d-flex align-item-center justify-content-center"> */}
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="editProject">
              <Card.Body>
                <h1>Edit Project</h1>
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
                        placeholder="Project Name (must be the same name)"
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

        </div>
      </div>
    );
  }
}
