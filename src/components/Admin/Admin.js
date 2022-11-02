import Navbar from "../Dashboard/Navbar"
import React, { useState, useEffect } from 'react'
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import "./AdminSytle.css";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "./DropdowMenu.js";
import { useNavigate } from "react-router-dom";
import { applyMutationToEventStore } from "@fullcalendar/react";

// admin credentials: email: admin@gmail.com  password: Admin123!
let filterType = "None";

export function AdminPage() {
    console.log("Admin Page");
    const user = getAuth().currentUser;
    const db = getDatabase();
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]); // userData to display
    const [userData2, setUserData2] = useState([]); // copy of userData from db
    let userDataList = [];
    
    // redirects to home page if user is not admin // Hardcoded 
    function checkValidAdmin()
    {
        if (user.uid != "sl99ANRsAscaBU6n1mFxC6wMpk13") { 
            navigate("/#", { state: { role: "student" } });
            alert("Not admin user");
        }
    }

    // get user data from db
    function getUserData()
    {
        checkValidAdmin();
        get(ref(db, "users/")).then((snapshot) => {
            if (snapshot.exists()) {
                //loop through users in db
                snapshot.forEach((eventShot) => {
                    //console.log(eventShot.val().email);
                    var userEmail = eventShot.val().email;
                    var userEUID = eventShot.val().eUID;
                    var userFirst = eventShot.val().firstName;
                    var userLast = eventShot.val().lastName;
                    var userRole = eventShot.val().role;
                    var userVals = {email: userEmail, euid: userEUID, role: userRole, first: userFirst, last: userLast};
                    userDataList.push(userVals);
                })
                setUserData(userDataList);
                setUserData2(userDataList);
                console.log("User data loaded from db");
            } else {
                console.log("No user data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }// getUserData()

    function handleFilterInput(userInput) // filters users based on search input
    {
        let userDataFiltered = [];

        for (let item in userData2) // loop through user data
        { 
            let current = userData2[item].email

            // get item corresponding to filter type
            if (filterType == "euid") {
                current = userData2[item].euid;
            }
            else if (filterType == "firstName") { // FIX ME: Does not work properly, may delete in future
                current = userData2[item].first;
            }
            else { 
                current = userData2[item].email; // get current filter item
            }
            
            if (current.includes(userInput)) // if user includes search input, add user to filtered list
            {
                userDataFiltered.push(userData2[item]);
            }
        }
        setUserData(userDataFiltered); // update userData list to display filtered data
        console.log(userDataFiltered);
    }

    function handleDelete(e) {
        const userDelete = e.target.parentNode.parentNode.childNodes[1].innerHTML; // get euid next to x button
        console.log("del:", userDelete)

        // display confirmation window to delete user
        if (window.confirm("Are you sure you want to delete " + userDelete + " This cannot be reversed")) {
            // delete user data from database
            remove(ref(db, "users/" + userDelete))
            alert("User deleted");
            getUserData();
        }
        else
        {
            console.log("no delete");
        }
    }
       
    useEffect(() => {
        getUserData();
    }, []);
    
    
    // rendered content
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="info-container">
                    <div className="info-window-outer">
                        <div className="info-window-inner">
                            <h1 id="main-title">User Management</h1>
                            <DropdownMenu></DropdownMenu>
                            <div className="input-container">
                                <div className="input-data">
                                    <input id="input-search" type="text" placeholder="SELECT FILTER ABOVE" disabled="true" onChange={(e) => handleFilterInput(e.target.value)}></input>
                                    
                                    <label></label>
                                </div>
                            </div>
                            <div className="table-container">
                                {/* <div className="table-content"> */}
                                <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>EUID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                

                                {userData.map((val, key) => { /* map userData array into table*/
                                    return (
                                        <tr key={key}>
                                            <td>{val.email}</td>
                                            <td>{val.euid}</td>
                                            <td>{val.last}</td>
                                            <td>{val.first}</td>
                                            <td>{val.role}</td>
                                            <td className="delete-user" onClick={(e) => handleDelete(e)}><button className="delete-user-button">X</button></td>
                                        </tr>
                                    )
                                    })}

                                
                                    
                                </table>

                                {/* </div> */}
                            </div>
                            <div className="add-user">
                                <button className="submit-user-button">Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function handleFilter(filterBy) // enable filter search box, allow search for certain filter type
{
    document.getElementById("input-search").disabled = false;
    document.getElementById("input-search").placeholder = filterBy;
    filterType = filterBy;
    console.log("filterType:"+ filterType);
}
