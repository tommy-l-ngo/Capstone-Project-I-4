//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect } from 'react';
// import '../LiveChat/ChatPage.css';
import './Milestones.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { useParams, useLocation } from 'react-router-dom';
import Comments from "../Comments/Comments";
import FileUpload from "../FileUpload/FileUpload";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref } from "firebase/database";
// import { ChatSide } from './ChatSide';
// import { ChatMain } from './ChatMain';

// Gets current user
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;



function onSubmit() { 

    
    
}






export function MilestonesPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [projects, setProjects] = useState([]);
    const [display, setDisplay] = useState(false);
    const [projectID, setProjectID] = useState("");
    
    useEffect(() => {


        var unsubcribe = getAuth().onAuthStateChanged(function(user) {
          console.log("loop starts here");
          if (user) {
            setLoggedIn(true);
            currUserID = user.displayName;
            /*
            //No need for all this anymore since we have displayName now
    
            get(child(dbRef, "users"))
            .then((snapShot) => {
            let match = false;
            if (snapShot.exists()) {
              // Grabs user id
              match = snapShot.forEach((curr) => {
                const ID = curr.ref._path.pieces_[1];
                let currUID = snapShot.child(ID).child("uid").val();
                if (currUID === user.uid) {
                  currUserID = snapShot.child(ID).child("eUID").val();
                  name = snapShot.child(ID).child("firstName").val();
                }
              });
            }
          })
          */
          } else {
            // No user is signed in.
            setLoggedIn(false);
          }
        
        
          // Grabs projects from database
    
          console.log('hi')
            if (user) {
              get(child(dbRef, "projects"))
              .then((snapShot) => {
                let projmatch = false;
                if (snapShot.exists()) {
                  // Matches projects that belong to user
                  projmatch = snapShot.forEach((subSnap) => {
                    //console.log(currUserID);
                    //console.log(subSnap.val().user_id);
                    if (subSnap.val().user_id === currUserID)
                    {
                        console.log("key: " + subSnap.key);
                        let project = {
                        key: subSnap.key,
                        text: subSnap.val().name,
                        desc: subSnap.val().description,
                        label: subSnap.val().date,
                        src: "images/img-1.png",
                        //path: `/Projects/${subSnap.val().project_id}`  
                      };
                      //console.log("key: " + subSnap.key)
                      //console.log(subSnap.val().name == subSnap.key)
                      setProjects((projects) => [...projects, project]); //adding found project to array of user's projects
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
        /*
        function getCurrentUser(auth) {
          return new Promise((resolve, reject) => {
             const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
             }, reject);
          });
        }
        */
        })
      
        //unsubcribe();
    
      }, []);
    
  /*
   useEffect(() => {
        //getting the project by key
        var unsubcribe = getAuth().onAuthStateChanged(function(user) {
            if (user) {
                get(child(dbRef, "users/"))
                    .then((snapShot) => {
                        snapShot.forEach((user, index) => {
                        
                    })
                })
          }

      })
    
      //unsubcribe();

    }, []); 
    */



  
    return (
        <>
            <Navbar />
            <div className='milestoneTitle'>
                <h1>Milestones</h1>
            </div>

            <div id="milestoneContainer">
            <button class="addSubmit" onClick={onSubmit}>
            Submit
            </button>                {/* <ChatSide/> */}
                {/* <ChatMain/> */}
            </div>    
        </>
      );
}
