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
import { storage } from "../../firebase";
import {uploadBytesResumable, getDownloadURL } from "firebase/storage";


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
        tasks: [""], //tasks is an array of strings
        students: [], //list of involved students' euids as an array of strings 
      });

      const navigate = useNavigate();

    function add_project(project_name, project_description, project_tasks, project_date, project_students)
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
 
    }

    function handleSubmit(event) {
        const { projectName, description, tasks, date, students } = projInfo;
        event.preventDefault();
        //alert(JSON.stringify(projInfo.tasks));
        alert(`
                ____New Project Details____\n
                Project : ${projectName}
                Description : ${description}
                Tasks : ${tasks.join(", ")}
                Date : ${date}
                Students : ${students.join(", ")}
            `);
    
        add_project(
          projInfo.projectName,
          projInfo.description,
          projInfo.tasks,
          JSON.stringify(projInfo.date),
          projInfo.students
        );

        
      }

      function handleChange(event) {
        let updatedValue = {[event.target.name]: event.target.value};
        setProjInfo({...projInfo, ...updatedValue}); //setting new value
      }

      function handleStudentsChange(listOfStudents) {
        let updatedList = [];
        listOfStudents.forEach((student) => { 
          updatedList = [...updatedList, student.value]; //getting an array of students' ids
        });

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

          const [file, setFile] = useState()

  // progress
  const [percent, setPercent] = useState(0)

 

          function handleSubmit(event) {
           
        
            const fullPath = window.location.href;
            const projectPath = fullPath.substring(fullPath.lastIndexOf('/') + 1)
            const storageRef = ref(storage, `/projects/${projectPath}/${file.name}`);
         
            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);
          };
         /* fileChange(e)
          {
            let files=e.target.files;
          }*/

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
                          {projInfo.tasks.map((element, index) => (
                            <div className="form-inline" key={index}>
                              <div className="form__group field">
                                <input
                                  id="tasks"
                                  name="tasks"
                                  className="form__field"
                                  placeholder="Task"
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

                          <div className="form-inline">
                            
                            <form id="fileSubmit" onSubmit={handleSubmit}>
                              <h4>Upload a File</h4>
                                <div className='fileSelector'>
                                  <input type="file" onChange={handleChange}/>
                                  <button className='uploadBtn' type="submit">Upload</button>
                                </div>
                                
                            </form>
                          </div>

                        {/*<div className="form-inline">
                         <div className="form__group field">
                           <input type="file" onchange={(e)=>this.fileChange(e)}/>
                         </div>              
                              </div>*/}
        
                          <Button type="submit">Submit</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </div>
                  {/* </Container> */}
                </div>
              </div>
            ); 

};