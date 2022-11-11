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
import { getDatabase, ref, set, push, get, child, remove} from "firebase/database";
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

export function EditProject(props)
{
      const [projInfo, setProjInfo] = useState({
        name: "",
        description: "",
        date: new Date(),
        tasks: [""], //tasks is an array of strings
        students: [], //list of involved students' euids as an array of strings 
      });
      const [preselected, setPreselected] = useState([]);

      const dbRef = ref(getDatabase());
      const navigate = useNavigate();
      const location = useLocation();
      const {key} = location.state;


      useEffect(() => {
        //getting the project by key
        var unsubcribe = getAuth().onAuthStateChanged(function(user) {
          if (user) {
            get(child(dbRef, "projects/" + key))
            .then((snapShot) => {
              if (snapShot.exists()) {
                const project = snapShot.val();
                project.date = new Date(project.date);
                //const valid = !Number.isNaN(new Date(project.date).getTime());
                setProjInfo(project);
                
                project.students.forEach((id, index) => {
                  let selected = {label: id, value: id};
                  setPreselected(preselected => [...preselected, selected]);
                })
              }
            })
          }

      })
    
      //unsubcribe();

    }, []);
      

    function edit_project(project_name, project_description, project_tasks, project_date, project_students)
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
        let dbRef = ref(db, "projects/" + key);
        set(dbRef, {
          name: project_name,
          user_id: user.displayName,
          description: project_description,
          tasks: project_tasks,
          date: project_date,
          students: project_students
        })
        .then(() => {
          window.location = "/" //navigate back to homepage after adding new project 
          //console.log("navigating");
        })
        .catch((err) => {
          alert("Edit unsuccessful, set failed: " + err.message);
        })

        /*
        This is no good. We need to push new objects with unique identifiers or else
        we cannot specify a project and projects of different people with the same
        project name will just overwrite each other. 
        
        IMPORTANT: Use push() instead when adding to the
        database and set() when modigying an exisiting object in the database.

        const db = getDatabase();
        set(ref(db, "projects/" + project_name), {
          name: project_name,
          user_id: user.displayName,
          description: project_description,
          tasks: project_tasks,
          date: project_date,
          students: project_students
        }).then(() => {
          navigate("/Home"); //navigate back to homepage after adding new project 
          //console.log("navigating");
        });
        */
 
  }
  
  function handleEditNotifs(event) {
    const user = getAuth().currentUser;
    const db = getDatabase();
    let dbRef = ref(db, "notifications/");
    push(dbRef, {
      name: `edited project:  ${projInfo.name}`,
      user_id: user.displayName,
      date: new Date().toLocaleString(),
    })
  }

  function handleDeleteNotifs(event) {
    const user = getAuth().currentUser;
    const db = getDatabase();
    let dbRef = ref(db, "notifications/");
    push(dbRef, {
      name: `deleted project:  ${projInfo.name}`,
      user_id: user.displayName,
      date: new Date().toLocaleString(),
    })
  }

    function handleSubmit(event) {
      const { name, description, tasks, date, students} = projInfo;
      event.preventDefault();
      //alert(JSON.stringify(projInfo.tasks));
      alert(`
              ____New Project Details____\n
              Project : ${name}
              Description : ${description}
              Tasks : ${tasks.join(", ")}
              Due Date : ${date.toDateString()}
              Students : ${students.join(", ")}
          `);
    
        edit_project(
          projInfo.name,
          projInfo.description,
          projInfo.tasks,
          //JSON.stringify(projInfo.date),
          projInfo.date.toDateString(),
          projInfo.students
        );

      handleEditNotifs();
      }

    function handleDelete(event) {//this will handle what happens whne the delete button is pressed
        //const { state } = this.props.location; 
       //console.log(state);
       //alert('test');
      const db = getDatabase();
      var rmvref = ref(db, "projects/" + key);
      //var rmvref = firebase.database().ref("projects/" + key);
      remove(rmvref)
      .then(() => {
        alert("Project deleted successfully!");
        handleDeleteNotifs();
        window.location = "/";
      })
      .catch((err) => {
        alert("delete unsuccessful: " + err.message);
      });
         
    }

      function handleChange(event) {
        let updatedValue = {[event.target.name]: event.target.value};
        setProjInfo({...projInfo, ...updatedValue}); //setting new value
      }

      function handleStudentsChange(listOfStudents) {
        let updatedList = [];
        let updatedSelection = [];
        listOfStudents.forEach((student) => { 
          updatedList = [...updatedList, student.value]; //getting an array of students' ids
          let option = {label: student.value, value: student.value};
          updatedSelection = [...updatedSelection, option];
        });

        setPreselected(updatedSelection);

        let updatedValue = {students: updatedList};
        setProjInfo({...projInfo, ...updatedValue});
      }

      function selectDate(e){
        let updatedValue = {date:e};
        setProjInfo({...projInfo, ...updatedValue});
        }

       function handleChanges(i, e) {
            let tasks = projInfo.tasks; //getting list of tasks
            tasks[i] = e.target.value; //modifying specific task in list
            setProjInfo({ ...projInfo, tasks }); //adding new list with modified task
            //this.props.push()
          }

         function addFormFields() {
           let tasks = [...projInfo.tasks, ""]; //adding an empty task
            setProjInfo({...projInfo, tasks});
          }

        function removeFormFields(i) {
            let tasks = projInfo.tasks;
            tasks.splice(i, 1); //removing a task
            setProjInfo({...projInfo, tasks});
          }

            return (
              <div>
                <Navbar />
                <div className="cp-box">
                  {/* <Container className="d-flex align-item-center justify-content-center cp-box"> */}
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className="createProject">
                      <Card.Body>
                        <h1>Edit Project</h1>
                        <div
                          className="w-100 text-center mt-2 text-danger"
                          id="errorMessage"
                        ></div>
                        <h3 style={{ lineHeight: "0px" }}></h3>
         
                        <Form onSubmit={handleSubmit}> {/* line for handling submit action */}
                          {/* field for inputting project name */}
                          <Form.Group id="name">
                            <div className="form__group field">
                              <input
                                name="name"
                                id="name"
                                className="form__field"
                                type="text"
                                placeholder="Project Name"
                                defaultValue={projInfo.name}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="name" className="form__label">
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
                                defaultValue={projInfo.description}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="description" className="form__label">
                                Description
                              </label>
                            </div>
                          </Form.Group>
        
                          {/* field for tasks */}
                          {projInfo.tasks.map((element, index) => (
                            <div className="form-inline" key={index}>
                              <div className="form__group field">
                                <input
                                  id="tasks"
                                  name="tasks"
                                  className="form__field"
                                  placeholder="Task"
                                  defaultValue={element}
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
                            selected={preselected}
                            onChange={handleStudentsChange}
                          />
                          <label htmlFor="students" className="form__label" >
                                Add student(s) to project
                              </label>
                          </div>
                          </Form.Group>
        
                          <Button type="submit">Save Changes</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                  <div style={{ minWidth: "400px" }}>
                    <Card className="deleteProject">
                      <Card.Body>
                          <Button type="delete" onClick={handleDelete}>Delete Project</Button>
                      </Card.Body>
                    </Card>
                  </div>
                  {/* </Container> */}
                </div>
              </div>
            ); 

};