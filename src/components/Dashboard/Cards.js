import React, { useState, useEffect } from "react";
import CardItem from './CardItem';
import './Cards.css';
import data from "./data"
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";
import { Col } from "react-bootstrap";

// User authentification
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;

getAuth().onAuthStateChanged(function(user) {
  if (user) {
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
  } else {
    // No user is signed in.
  }
});
    // Grabs projects from database
    let projects = [];
    getAuth().onAuthStateChanged(function(user) {
      if (user) {
    get(child(dbRef, "projects"))
    .then((snapShot) => {
      let projmatch = false;
      if (snapShot.exists()) {
        // Matches projects that belong to user
        projmatch = snapShot.forEach((subSnap) => {
            console.log(currUserID);
            console.log(subSnap.val().user_id);
            if (subSnap.val().user_id === currUserID)
            {
            projects.push({
                id: subSnap.val().project_id,
                text: subSnap.val().name,
                desc: subSnap.val().description,
                label: subSnap.val().date,
                src: "images/img-1.png"
                //path: `/Projects/${subSnap.val().project_id}`
                
            })
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
});

function Cards() {
    // This maps out all of the projects pertaining to the user
  return (
        <div className='cards'>
            <h1>Current Projects</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {data.cardData.map((item, index)=>{
                            return(
                                <CardItem 
                                key={index} 
                                src={item.src} 
                                text={item.text} 
                                desc={item.desc} 
                                label={item.label} 
                                path={`/Projects/${item.id}`}
                                />
                            )
                        })}
                        {/*projects.length === 0 ? (
                            <h4>No current projects!</h4>
                            ) : */(projects.map((item, index)=>{
                            
                            return(
                                /*<div className="col-12  col-lg-4">*/
                                <CardItem 
                                key={index} 
                                src={item.src} 
                                text={item.text} 
                                desc={item.desc} 
                                label={item.label} 
                                path={`/Projects/${item.text}`}
                                />
                                /*</div>*/
                            )
                        }))}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}
/*

                        
*/
export default Cards;