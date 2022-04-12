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
      /*task: '',*/ date: "",
      formValues: [{ tasks: "" }],
      students: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.add_project = this.add_project.bind(this);
  }

  add_project(project_name, project_description, project_tasks, project_date) {
    const db = getDatabase();
    set(ref(db, "projects/" + project_name), {
      user_id: "pkv0024",
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
            Student : ${students}
        `);

    this.add_project(
      this.state.projectName,
      this.state.description,
      this.state.task,
      this.state.date
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleStudentsChange(listOfStudents) {
    this.setState({
      students: listOfStudents,
    });
  }
  handleChanges(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState({
      formValues: [...this.state.formValues, { tasks: "" }],
    });
  }

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

                <Form onSubmit={this.handleSubmit}>
                  <Form.Group id="projectName">
                    {/* <Form.Label htmlFor="projectName">Project Name</Form.Label> */}
                    {/* <div className="inputField2"> */}
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
                      {/* </div> */}
                    </div>
                    {/* <Form.Control
                          type="text"
                          id="projectName"
                          name="projectName"
                          placeholder="Project Name"
                          value={this.state.projectName}
                          onChange={this.handleChange}
                          required
                        ></Form.Control> */}
                  </Form.Group>

                  <Form.Group id="description">
                    <div className="form__group field">
                      <input
                        id="description"
                        name="description"
                        className="form__field"
                        placeholder="Description"
                        // value={this.state.description}
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="description" className="form__label">
                        Description
                      </label>
                    </div>

                    {/* <Form.Label htmlFor="description"></Form.Label>
                        <Form.Control
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          required
                        ></Form.Control> */}
                  </Form.Group>

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
                          Task
                        </label>
                      </div>

                      {/* <label>Task</label>
                          <input
                            type="text"
                            name="tasks"
                            value={element.tasks || ""}
                            onChange={(e) => this.handleChanges(index, e)}
                          /> */}
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
                  <div className="button-section">
                    <button
                      className="button add"
                      type="button"
                      onClick={() => this.addFormFields()}
                    >
                      Add
                    </button>
                  </div>

                  <Form.Group id="date">
                    <div className="form__group field">
                      <input
                        id="date"
                        name="date"
                        className="form__field"
                        placeholder="Date"
                        value={this.state.date}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="date" className="form__label">
                        Date
                      </label>
                    </div>

                    {/* <Form.Label htmlFor="date"></Form.Label>
                        <Form.Control
                          type="text"
                          id="date"
                          name="date"
                          placeholder="Due Date"
                          value={this.state.date}
                          onChange={this.handleChange}
                          required
                        ></Form.Control> */}
                  </Form.Group>

                  <MultiSelect
                    onChange={this.handleStudentsChange.bind(this)}
                  />

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
