import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, set, remove } from "firebase/database";
import "./Notifications.css"

// User authentification
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;

const Notifications = (props) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [notifs, setNotifs] = useState([]);
    const [updateNotifs, setUpdateNotifs] = useState(true);
  
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
                                    console.log("notif key: " + subSnap.key);
                                    let notif = {
                                        key: subSnap.key,
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

    function handleDelete(event, param) {//this will handle what happens whne the delete button is pressed
        //const { state } = this.props.location; 
       //console.log(state);
       //alert('test');
        const db = getDatabase();
        var rmvref = ref(db, `notifications/${param}`);
        
        const removeArr = [...notifs].filter(notif => notif.key !== param)
        setNotifs(removeArr);

      remove(rmvref)
      .then(() => {
        console.log("notif delete successful")
      })
      .catch((err) => {
        alert("delete unsuccessful: " + err.message);
      });
    }

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
                                            <button className="notifs-btn">
                                            <button className="delete-btn" onClick={event => handleDelete(event, item.key)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                            <li className="notif_msg">
                                                <span className="id-color">{item.user}</span>
                                                <span>:&ensp;{item.message}</span>
                                                <ul>
                                                    <li className="notif_date">{item.date}</li>
                                                </ul>
                                                </li>
                                                </button>
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