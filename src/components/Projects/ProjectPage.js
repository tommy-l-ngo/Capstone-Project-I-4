import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { Link, useParams, useLocation } from 'react-router-dom';
import './ProjectPage.css';
import Comments from "../Comments/Comments";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";

// Gets current user
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;
var loggedIn = false;
getAuth().onAuthStateChanged(function(user) {
  if (user) {
    loggedIn = true;
    get(child(dbRef, "users"))
    .then((snapShot) => {
      let match = false;
      if (snapShot.exists()) {

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
    loggedIn = false;
  }
});

let projects = [];
get(child(dbRef, "projects"))
.then((snapShot) => {
  let projmatch = false;
  if (snapShot.exists()) {
    // Matches projects that belong to user
    projmatch = snapShot.forEach((subSnap) => {
        //console.log('Curent URL', window.location.href);
        //const location = useLocation();
        //console.log('pathname', location.pathname);
        /*do{
          const fullPath = window.location.href;
          console.log('path', fullPath);
        } while(fullPath === "http://localhost:3000/#/Login");*/
        const fullPath = window.location.href;
        const projectPath = fullPath.replace("http://localhost:3000/#/Projects/", '');
        //console.log('path', projectPath);
        if(!subSnap.val().name) return
        const path_withSpaces = subSnap.val().name;
        const projectName = path_withSpaces.replace(/ /g, '_');
        console.log('projectPath', projectPath);
        console.log('projectName', projectName);
        if (projectPath === projectName)
        {
          projects.push({
            id: subSnap.val().project_id,
            text: subSnap.val().name,
            desc: subSnap.val().description,
            label: subSnap.val().date,
            src: "images/img-1.png"
        })
    }
      //const ID = curr.ref._path.pieces_[1];
      //let currUID = snapShot.child(ID).child("uid").val();
      //if (currUID === user.uid) {
        //name = snapShot.child(ID).child("firstName").val();
    });
  }
});  

function ProjectPage() {
    
    //Gets Project Id
    const { id } = useParams();
    //console.log(id);
    
    //Gets data based on project Id
    const getData = data.cardData[id - 1];
    
    console.warn(getData);

    const location = useLocation();
    const fullDataPath = location.pathname;
    const dataPath = fullDataPath.replace("/Projects/", '');
    //console.log('dataPath', dataPath);
    /*
    const [isLoading, setLoading] = useState(true); // Loading state
    
    useEffect(() => { // useEffect hook
    setTimeout(() => { // simulate a delay
        setLoading(false); //set loading state
     }, 3000);
    }, []);
    
    if (isLoading) {
      return(
        <div className="projects_page">
          <Navbar />
          <div className="project_details">
              <h1>Loading Project...</h1>            
          </div>
        </div>
      );
    }
*/
    if ((dataPath === "1" || dataPath === "2" || dataPath === "3"))
      return(
      <div className="projects_page">
        <Navbar />
        <div className='rightsection'>
        <div className = "task_btn">
                <Button
                    page="Tasks"
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize="btn--medium"
        >   
                    Tasks
                </Button>
        </div>
        <div className='project_comments'>
            {currUserID == undefined ? 
            (<Comments currentUserId={0} />) : 
            (<Comments currentUserId={currUserID}  />)
            }
        </div>
        </div>
        <div className="project_details">
          
            <h1>{getData.text}</h1>
            <h3>{getData.desc}</h3>
            <hr/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Cursus in hac habitasse platea dictumst quisque. Sed libero enim sed faucibus turpis in eu mi. Fusce id velit ut tortor pretium. Lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam id leo. Urna id volutpat lacus laoreet non curabitur. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Purus non enim praesent elementum facilisis leo vel. Eu non diam phasellus vestibulum lorem sed risus ultricies. Turpis massa sed elementum tempus. In tellus integer feugiat scelerisque. Quis vel eros donec ac odio tempor orci. Cursus mattis molestie a iaculis at erat. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Id donec ultrices tincidunt arcu non sodales neque.</p>
            <p>Orci ac auctor augue mauris augue neque. Arcu cursus euismod quis viverra nibh cras pulvinar. Rhoncus mattis rhoncus urna neque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Morbi enim nunc faucibus a. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Non blandit massa enim nec dui nunc mattis. Volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur a. Rhoncus mattis rhoncus urna neque. Aenean pharetra magna ac placerat vestibulum. Integer enim neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non arcu. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Cursus turpis massa tincidunt dui ut ornare.</p>
            
        </div>
    </div>
    );

    if(!(dataPath === "1" || dataPath === "2" || dataPath === "3") && !(projects[0] === null))
    return (
        <div className='projects_page'>
            <Navbar />
            <div className='rightsection'>
            <div className = "task_btn">
                    <Button
                        page="Tasks"
                        className="btns"
                        buttonStyle="btn--primary"
                        buttonSize="btn--medium"
            >   
                        Tasks
                    </Button>
            </div>
            <div className='project_comments'>
                {currUserID == undefined ? 
                (<Comments currentUserId={0} />) : 
                (<Comments currentUserId={currUserID}  />)
                }
            </div>
            </div>
            <div className='project_details'>
                {(projects.map((item, index)=>{
                  return(
                    <>
                      <h1>{item.text}</h1>
                      <h3>{item.desc}</h3>
                      <hr/>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Cursus in hac habitasse platea dictumst quisque. Sed libero enim sed faucibus turpis in eu mi. Fusce id velit ut tortor pretium. Lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam id leo. Urna id volutpat lacus laoreet non curabitur. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Purus non enim praesent elementum facilisis leo vel. Eu non diam phasellus vestibulum lorem sed risus ultricies. Turpis massa sed elementum tempus. In tellus integer feugiat scelerisque. Quis vel eros donec ac odio tempor orci. Cursus mattis molestie a iaculis at erat. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Id donec ultrices tincidunt arcu non sodales neque.</p>
                      <p>Orci ac auctor augue mauris augue neque. Arcu cursus euismod quis viverra nibh cras pulvinar. Rhoncus mattis rhoncus urna neque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Morbi enim nunc faucibus a. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Non blandit massa enim nec dui nunc mattis. Volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur a. Rhoncus mattis rhoncus urna neque. Aenean pharetra magna ac placerat vestibulum. Integer enim neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non arcu. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Cursus turpis massa tincidunt dui ut ornare.</p>
                    </>
                  )
                }))}
                {/*<h1>{getData.text}</h1>
                <h3>{getData.label}</h3>
                
                <p>{getData.desc}</p>*/}
            </div>
        </div>
  );
}
/*
class ProjectPage extends Component {
    render() {
        let getId = this.props.match.params.id;
        const id = this.props.match.params.id;
        console.log(id)
        const getData = data.cardData[getId - 1];

        console.warn(getData);
        return (
            <div>
                <Navbar />
                <h1>{getData.text}</h1>
                <h3>{getData.label}</h3>
                <p>{getData.desc}</p>
            </div>
        )
    }
}
*/
export default ProjectPage;