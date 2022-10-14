import Navbar from "../Dashboard/Navbar"
import React, { useState, useEffect } from 'react'
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";

// admin credentials: email: admin@gmail.com  password: Admin123!

export function AdminPage() {
    console.log("Admin Page");
    const user = getAuth().currentUser;
    const db = getDatabase();

    // connect to auth
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        console.log(displayName);
    }
    else
    {
        console.log("No User");
    }

    // connect to db
    get(ref(db, "users/")).then((snapshot) => {
        if (snapshot.exists()) {
            //loop through users in db
            snapshot.forEach( (eventShot) => {
                console.log(eventShot.val().email);
            })
            
        } else {
            console.log("No user data available");
        }
    }).catch((error) => {
        console.error(error);
    });



    // rendered content
    return (
        <div style={{ backgroundColor: 'white' }}>
            <Navbar />
            <h1>Users</h1>
            <h3>email firstName lastName role euid</h3>
            <textarea></textarea>
        </div>
    )
}
