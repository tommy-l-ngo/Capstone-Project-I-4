import React, {Component}  from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

export default class CreateProject extends Component {
    render() {
        return (
            <div>
               <Container className="d-flex align-item-center justify-content-center">
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card className="register">
                            <Card.Body>
                                <h1>Registration</h1>
                                <div className="w-100 text-center mt-2 text-danger" id="errorMessage"></div>
                                <h3 style={{ lineHeight: '0px' }}>Register as</h3>
                                
                                <Form>
                                    <Form.Group id="description">
                                        <Form.Label htmlFor="description" ></Form.Label>
                                        <Form.Control type="text" id="description" name="description" placeholder="Description" required></Form.Control>
                                    </Form.Group>

                                    <Form.Group id="task">
                                        <Form.Label htmlFor="task" ></Form.Label>
                                        <Form.Control type="text" id="task" name="task" placeholder="Tasks" required></Form.Control>
                                    </Form.Group>
                                    {/*this task field may change based on our scope later*/}

                                    <Form.Group id="date">
                                        <Form.Label htmlFor="date"></Form.Label>
                                        <Form.Control type="text" id="date" name="date" placeholder="Due Date" required></Form.Control>
                                    </Form.Group>

                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
        )
    }
}