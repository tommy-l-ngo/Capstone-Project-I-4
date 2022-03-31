import { getDatabase, update } from "firebase/database";
import React, { Component } from "react";
import { Form, Button, Card, Container, InputGroup, FormControl } from "react-bootstrap";
import firebase from "firebase/compat/app"
import { ref, set} from "firebase/database"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAu1kdEKPqTfL1XIjDF2l8rfG53FcdtVSM",
    authDomain: "capstone-i4.firebaseapp.com",
    databaseURL: "https://capstone-i4-default-rtdb.firebaseio.com",
    projectId: "capstone-i4",
    storageBucket: "capstone-i4.appspot.com",
    messagingSenderId: "768427043765",
    appId: "1:768427043765:web:6643185734fe346ddd07fc",
    measurementId: "G-X8E63KZMT3"
  };
  

export default class EditProject extends Component {

    constructor(props) {
        super(props)
        this.state = { projectName: '', description: '', task: '', date: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.edit_project = this.edit_project.bind(this); 
        
    }
    edit_project(project_name,project_description,project_tasks,project_date)
    {
       
        
        const db = getDatabase(); 
        set(ref(db, "projects/" + project_name ), {
            description:project_description,
            tasks:project_tasks,
            date:project_date,
        
        }); 
        

    }
    handleSubmit(event) {
        const { projectName, description, task, date } = this.state
        event.preventDefault()
        alert(`
            ____Your Details____\n
            Title : ${projectName}
            Description : ${description}
            Task : ${task}
            Date : ${date}
        `)
        this.edit_project(this.state.projectName,this.state.description,this.state.task,this.state.date);
    }

    handleChange(event){
        this.setState({
          // Computed property names
          // keys of the objects are computed dynamically
          [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <div>
                <Container className="d-flex align-item-center justify-content-center">
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card className="editProject">
                            <Card.Body>
                                <h1>Edit Project</h1>
                                <div className="w-100 text-center mt-2 text-danger" id="errorMessage"></div>
                                <h3 style={{ lineHeight: '0px' }}></h3>

                                <Form onSubmit={this.handleSubmit}>
                                {/*<InputGroup size="sm" className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>*/}
                                    <Form.Group id="projectName">
                                        <Form.Label htmlFor="projectName" ></Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            id="projectName" 
                                            name="projectName" 
                                            placeholder="Project Name" 
                                            value = {this.state.projectName}
                                            onChange={this.handleChange}
                                            required>
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group id="description">
                                        <Form.Label htmlFor="description" ></Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            id="description" 
                                            name="description" 
                                            placeholder="Description" 
                                            value = {this.state.description}
                                            onChange={this.handleChange}
                                            required>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group id="task">
                                        <Form.Label htmlFor="task" ></Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            id="task" 
                                            name="task" 
                                            placeholder="Tasks" 
                                            value = {this.state.task}
                                            onChange={this.handleChange}
                                            required>
                                        </Form.Control>
                                    </Form.Group>
                                    {/*this task field may change based on our scope later*/}

                                    <Form.Group id="date">
                                        <Form.Label htmlFor="date"></Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            id="date" 
                                            name="date" 
                                            placeholder="Due Date" 
                                            value = {this.state.date}
                                            onChange={this.handleChange}
                                            required>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        )
    }
}