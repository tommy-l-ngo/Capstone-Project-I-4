import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref } from "firebase/database";
import "./Notifications.css"

// User authentification
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;

const Notifications = (props) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [notifs, setNotifs] = useState([]);
  
    /*
    Everything is encapsualted in useEffect so that the onAuthStateChanged
    listener is set only once at and by providing an empty dependency array to useEffect(), 
    we tell it to run the callback only once, when the component initially renders, 
    so the auth listener is set only once. Without useEffect() here, an infinite loop occurs.
    */
    useEffect(() => {
        var unsubcribe = getAuth().onAuthStateChanged(function (user) {
            console.log("loop starts here");
            if (user) {
                setLoggedIn(true);
                currUserID = user.displayName;
            } else {
                // No user is signed in.
                setLoggedIn(false);
            }
      
      
            // Grabs projects from database
  
            console.log('hi')
            if (user) {
                get(child(dbRef, "notifications"))
                    .then((snapShot) => {
                        let notifsMatch = false;
                        if (snapShot.exists()) {
                            // Matches projects that belong to user
                            notifsMatch = snapShot.forEach((subSnap) => {
                                //console.log(currUserID);
                                //console.log(subSnap.val().user_id);
                                if (subSnap.val().user_id === currUserID) {
                                    let notif = {
                                        message: subSnap.val().name,
                                        user: subSnap.val().user_id,
                                        date: subSnap.val().date,
                                    };
                                    //console.log("key: " + subSnap.key)
                                    //console.log(subSnap.val().name == subSnap.key)
                                    setNotifs((notifs) => [...notifs, notif]); //adding found project to array of user's projects
                                }
                                //const ID = curr.ref._path.pieces_[1];
                                //let currUID = snapShot.child(ID).child("uid").val();
                                //if (currUID === user.uid) {
                                //name = snapShot.child(ID).child("firstName").val();
                            });
                        }
                    })
            } else {
                // No user is signed in.
            }
        })
    
        //unsubcribe();
  
    }, []);

    if (loggedIn === true) {
    return (
        <div className="card-section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <h1 className="card-title">Notifications</h1>
                    <ul className="notifications">
                        {notifs.length ? 
                            (
                                notifs.map((item, index)=>{
                                    return (
                                        <div>
                                            <li className="notif_msg">{item.user}:&ensp;{item.message}
                                                <ul>
                                                    <li className="notif_date">{item.date}</li>
                                                </ul>
                                            </li>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                              ) 
                              : 
                              (
                                <p>No current notifications!</p>
                              )}
                    </ul>
                </div>
            </div>
        </div>
    )
    }
    else {
        <div>
            <p>No current notifications</p>
        </div>
    }
}

export default Notifications;