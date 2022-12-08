import React, { useState, useEffect } from "react";
import CardItem from './CardItem';
import './Cards.css';
import data from "./data"
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";

// User authentification
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;
//var loggedIn = false;

//let projects = [];





function Cards() {

  //Need to use stateful variables, not just regular variables
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  /*
  Everything is encapsualted in useEffect so that the onAuthStateChanged
  listener is set only once at and by providing an empty dependency array to useEffect(), 
  we tell it to run the callback only once, when the component initially renders, 
  so the auth listener is set only once. Without useEffect() here, an infinite loop occurs.
  */
  useEffect(() => {
    var unsubcribe = getAuth().onAuthStateChanged(function(user) {
      //console.log("loop starts here");
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

      //console.log('hi')
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

                subSnap.child("students").forEach((subSubSnap) => {
                  //console.log("subSubSnap " + subSubSnap.val())
                  if (subSubSnap.val() === currUserID) {
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
                  };
              });
              //const ID = curr.ref._path.pieces_[1];
              //let currUID = snapShot.child(ID).child("uid").val();
              //if (currUID === user.uid) {
                //name = snapShot.child(ID).child("firstName").val();
              });
            }
            setLoading(false);
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
  


    // if (loggedIn === true){
  return (
  <>
      {loggedIn ?
        (
        <div className='cards'>
          <h1>Current Projects</h1>
          <div className='cards__container'>
              <div className='cards__wrapper'>
                  <ul className='cards__items'>


                    {projects.length ? 
                      (
                        projects.map((item, index)=>{
                          const path_withSpaces = item.text;
                          const project_path = path_withSpaces.replace(/ /g, '_');
                        return(
                            <CardItem 
                            projectKey={item.key} 
                            src={item.src} 
                            text={item.text} 
                            desc={item.desc} 
                            label={item.label} 
                            path={`/Projects/${project_path}`}
                            />
                        )
                        })
                      ) 
                      : 
                        loading ?
                            <h4>Loading...</h4> 
                        :
                            <h4>Nothing to see here. Go create some projects!</h4>
                    }
                    
                
            </ul>
        </div>
    </div>
</div>
) : (<div className="a">a</div>)}
    </>)
// }
// if(loggedIn === false)
// {
  // return (

    
    
    
    
    // <div className='cards' id={localStorage.getItem('currTheme')}>
    //     <h1>Current Projects</h1>
    //     <div className='cards__container'>
    //         <div className='cards__wrapper'>
    //             <ul className='cards__items'>
    //                 <h4>No Current Projects.</h4>
    //             </ul>
    //         </div>
    //     </div>
    // </div >
      




  // )
// }
}
export default Cards;