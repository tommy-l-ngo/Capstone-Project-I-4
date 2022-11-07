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
    const [userPassword, setUserPassword] = useState(" ");
    const [userRole, setUserRole] = useState(" ");
    const [userDepartment, setUserDepartment] = useState(" ");
    const [error, setError] = useState(null);

    function cancelSubmit() {
        onClose();
    }

    const db = getDatabase();
    function onSubmit() {
        try {
            if (userEUID == "") {
                throw Error("Please enter EUID");
            } else if (userEmail == 0) {
                throw Error("Please enter Email Address.");
            } else if (userEmail < 6) {
                throw Error("Please enter a valid Email Address.");
            } else if (userFirstName == 0) {
                throw Error("Please enter first name.");
            } else if (userLastName == 0) {
                throw Error("Please enter last name.");
            } else {
            
                set(ref(db, "users/" + userEUID), {
                    department: userDepartment,
                    eUID: userEUID,
                    email: userEmail,
                    firstName: userFirstName,
                    lastName: userLastName,
                    password: userPassword,
                    role: userRole,
                });
                onClose();
            }
        } catch (err) {
                console.log(err.code);
                setError(err.message);
            }
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
                {error && (
                    <p
                        style={{
                            marginTop: "10px",
                            fontSize: "20px",
                            color: "red",
                        }}
                    >
                        {error}
                    </p>
                )}
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
                            <input
                                placeholder="EUID"
                                value={userEUID}
                                onChange={(e) => setUserEUID(e.target.value)}
                            />
                    </div>
                    <div>
                            <h6>First Name</h6>
                            <input
                                placeholder="First Name"
                                value={userFirstName}
                                onChange={(e) => setUserFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h6>Last Name</h6>
                            <input
                                placeholder="Last Name"
                                value={userLastName}
                                onChange={(e) => setUserLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h6>Email</h6>
                            <input
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                    </div>
                    <div>
                            <h6>Password</h6>
                            <input
                                placeholder="Password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <h6>Role</h6>
                            <input
                                placeholder="Role"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                            />
                    </div>
                    <div>
                            <h6>Department</h6>
                            <input
                                placeholder="Department"
                                value={userDepartment}
                                onChange={(e) => setUserDepartment(e.target.value)}
                            />
                    </div>

                        <button class="addSubmit" onClick={onSubmit}>Submit</button>
                        <button class="addCancel" onClick={cancelSubmit}>Cancel</button>
                    </form>
                </Container>
            </Modal>
        );
    }

