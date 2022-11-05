import Modal from "react-modal";
import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Container } from "react-bootstrap";
import { getDatabase, set, ref } from "firebase/database";
import { Link } from "react-router-dom";

export default function ({ isOpen, onClose }) {
    const user = getAuth().currentUser;
    const [userEmail, setUserEmail] = useState(" ");
    const [userEUID, setUserEUID] = useState(" ");
    const [userLastName, setUserLastName] = useState(" ");
    const [userFirstName, setUserFirstName] = useState(" ");
    const [userRole, setUserRole] = useState(" ");
    const [error, setError] = useState(null);

    function cancelSubmit() {
        onClose();
    }

    const db = getDatabase();
    function onSubmit() {

    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaHideApp={false}
            style={{
                content: {
                    position: "fixed",
                    borderRadius: "20px",
                    border: "10px solid #ccc",
                    top: "55%",
                    left: "50%",
                    msTransform: "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)",
                    height: "615px",
                    width: "500px",
                },
            }}

        >
            <div className="xBtn">
                <Link to="/Admin" className="xLink" onClick={onClose}>
                    <i className="fas fa-times xButton" />
                </Link>
            </div>
            <Container>
                <form onSubmit={onSubmit} style={{ margin: "50px" }}>
                <h3>Add User Form</h3>
                    <div>
                        <h6>EUID</h6>
                        <input placeholder="EUID" value={userEUID}></input>
                    </div>
                    <div>
                        <h6>Last Name</h6>
                        <input placeholder="Last Name" value={userLastName}></input>
                    </div>
                    <div>
                        <h6>First Name</h6>
                        <input placeholder="First Name" value={userFirstName}></input>
                    </div>
                    <div>
                        <h6>Email</h6>
                        <input placeholder="Email" value={userEmail}></input>
                    </div>
                    <div>
                        <h6>Role</h6>
                        <input placeholder="Role" value={userRole}></input>
                    </div>

                    <button class="addSubmit" onClick={onSubmit}>Submit</button>
                    <button class="addCancel" onClick={cancelSubmit}>Cancel</button>
                </form>
            </Container>
        </Modal>
    )
}

