//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { useParams, useLocation } from 'react-router-dom';
import './ProjectPage.css';
import Comments from "../Comments/Comments";
import FileUpload from "../FileUpload/FileUpload";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, set } from "firebase/database";
import Attachments from './Attachments';
import MilestonesBlock from '../Milestones/MilestonesBlock';

// Gets current user
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;



function ProjectPage() {

  //Need to use stateful variables, not just regular variables
  const [project, setProject] = useState({});
  const [currUserID, setCurrUserID] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [pKey2, setPKey2] = useState("");


  //Gets Project Id
  // const { id } = useParams();
  // //console.log(id);

  // //Gets data based on project Id
  // const getData = data.cardData[id - 1];

  //console.warn(getData);
  const location = useLocation();
  const fullDataPath = location.pathname;
  const dataPath = fullDataPath.replace("/Projects/", '');

  const [updatedValue, setUpdatedValue] = useState(project.paragraph);

  const { key } = location.state;

  function handleSubmit(event) {
    event.preventDefault();
    //debugger
    //console.log(updatedValue);
    //console.log(project.paragraph);
    if (updatedValue == undefined) {
      setUpdatedValue(project.paragraph);
    }
    //console.log(updatedValue);
    //console.log(project.students);
    const db = getDatabase();
    let dbRef = ref(db, "projects/" + key);
    set(dbRef, {
      name: project.name,
      user_id: project.user_id,
      description: project.description,
      tasks: project.tasks,
      date: project.date,
      //
      paragraph: updatedValue
      //students: project.students
    })
      .then(() => {
        window.location.reload(false);
        debugger
        //window.location = "projects/" + key //navigate back to homepage after adding new project
        //console.log("navigating");
      })
      .catch((err) => {
        alert("Edit unsuccessful, set failed: " + err.message);
      })
    console.log("success");
    alert("success");
    document.getElementById("paragraph-edit").style.display = "block";
  }

  function handleChange(event) {
    // console.log(updatedValue);
    let Value = { [event.target.name]: event.target.value };
    console.log(Value.paragraph);
    setUpdatedValue(Value.paragraph);
  }

  function showEditParagraph() {
    document.getElementById("paragraph-textarea").style.display = "inline";
    document.getElementById("paragraph-button").style.display = "inline";
    document.getElementById("paragraph-edit").style.display = "none";
  }

  /*
  Everything is encapsualted in useEffect so that the onAuthStateChanged
  listener is set only once at and by providing an empty dependency array to useEffect(), 
  we tell it to run the callback only once, when the component initially renders, 
  so the auth listener is set only once. Without useEffect() here, an infinite loop occurs.
  */
  function addMilestone() {

  }
  var project_key2 = "";
  var first = true;

  useEffect(() => {
    var key;
    project_key2 = location.state.key;

    if (location.state != null) {
      key = location.state.key;
      if (first) {
        // setPKey2(key);
        // project_key2 = key;

        first = false;
      }
      // alert(project_key2);
      sessionStorage.setItem("key", key);
      sessionStorage.setItem("pKey", key);
    }
    else {
      key = sessionStorage.getItem("key");
    }
    // alert(key);
    project_key2 = key;
    //getting the project by key
    var unsubcribe = getAuth().onAuthStateChanged(function (user) {
      if (user) {
        setCurrUserID(user.displayName);
        get(child(dbRef, "projects/" + key)) //get project based on key
          .then((snapShot) => {
            if (snapShot.exists()) {
              //let project = "";
              let project = snapShot.val();
              project.src = "images/img-1.png";
              //path: `/Projects/${subSnap.val().project_id}`  
              setProject(project);
              setProjectKey(project.key);
            }
          })
      }

    })
  }, []);

  //unsubcribe();

  // if ((dataPath === "1" || dataPath === "2" || dataPath === "3"))
  //   return(
  //   <div className="projects_page">
  //     <Navbar />
  //     <div className='rightsection'>
  //     <div className = "task_btn">
  //             <Button
  //                 page="Tasks"
  //                 className="btns"
  //                 buttonStyle="btn--primary"
  //                 buttonSize="btn--medium"
  //     >   
  //                 Tasks
  //             </Button>
  //     </div>
  //     <div className='project_comments'>
  //         {currUserID === undefined ? 
  //         (<Comments currentUserId={0} />) : 
  //         (<Comments currentUserId={currUserID}  />)
  //         }
  //     </div>
  //     </div>
  //     <div className="project_details">

  //         <h1>{getData.text}</h1>
  //         <h3>{getData.desc}</h3>
  //         <hr/>
  //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Cursus in hac habitasse platea dictumst quisque. Sed libero enim sed faucibus turpis in eu mi. Fusce id velit ut tortor pretium. Lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam id leo. Urna id volutpat lacus laoreet non curabitur. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Purus non enim praesent elementum facilisis leo vel. Eu non diam phasellus vestibulum lorem sed risus ultricies. Turpis massa sed elementum tempus. In tellus integer feugiat scelerisque. Quis vel eros donec ac odio tempor orci. Cursus mattis molestie a iaculis at erat. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Id donec ultrices tincidunt arcu non sodales neque.</p>
  //         <p>Orci ac auctor augue mauris augue neque. Arcu cursus euismod quis viverra nibh cras pulvinar. Rhoncus mattis rhoncus urna neque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Morbi enim nunc faucibus a. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Non blandit massa enim nec dui nunc mattis. Volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur a. Rhoncus mattis rhoncus urna neque. Aenean pharetra magna ac placerat vestibulum. Integer enim neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non arcu. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Cursus turpis massa tincidunt dui ut ornare.</p>

  //     </div>
  // </div>
  // );

  //if(!(project === null))
  return (
    <div className='projects_page'>
      <Navbar />
      <div className='rightsection'>
        <div className="task_btn">
          <Button
            page="Tasks"
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--medium"
          >
            Tasks
          </Button>

        </div>
        <div className="file_upload">
          <FileUpload />
        </div>
        <div className='project_comments'>
          {currUserID === undefined ?
            (<Comments currentUserId={0} />) :
            (<Comments currentUserId={currUserID} />)
          }
        </div>
      </div>
      <div className='project_details'>
        {project !== null ? (
          <>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
            <hr />
            <button
              className="project-paragraph-edit"
              id="paragraph-edit"
              onClick={showEditParagraph}
            >
              Edit paragraph
            </button>
            <form >
              <textarea
                className="project-paragraph-textarea"
                id="paragraph-textarea"
                name="paragraph"
                defaultValue={project.paragraph}
                onChange={handleChange}
              />
              <br />
              <button
                className="project-paragraph-button"
                id="paragraph-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
            <p>{project.paragraph}</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Cursus in hac habitasse platea dictumst quisque. Sed libero enim sed faucibus turpis in eu mi. Fusce id velit ut tortor pretium. Lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam id leo. Urna id volutpat lacus laoreet non curabitur. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Purus non enim praesent elementum facilisis leo vel. Eu non diam phasellus vestibulum lorem sed risus ultricies. Turpis massa sed elementum tempus. In tellus integer feugiat scelerisque. Quis vel eros donec ac odio tempor orci. Cursus mattis molestie a iaculis at erat. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Id donec ultrices tincidunt arcu non sodales neque.</p>
            <p>Orci ac auctor augue mauris augue neque. Arcu cursus euismod quis viverra nibh cras pulvinar. Rhoncus mattis rhoncus urna neque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Morbi enim nunc faucibus a. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Non blandit massa enim nec dui nunc mattis. Volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur a. Rhoncus mattis rhoncus urna neque. Aenean pharetra magna ac placerat vestibulum. Integer enim neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non arcu. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Cursus turpis massa tincidunt dui ut ornare.</p>

            <Attachments />


          </>
        ) : (
          <h1>Loading Data.</h1>
        )}
        {/* // <>
                    //   <h1>{project.name}</h1>
                    //   <h3>{project.description}</h3>
                    //   <hr/>
                    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo. Cursus in hac habitasse platea dictumst quisque. Sed libero enim sed faucibus turpis in eu mi. Fusce id velit ut tortor pretium. Lacus sed viverra tellus in. Ipsum consequat nisl vel pretium lectus quam id leo. Urna id volutpat lacus laoreet non curabitur. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Purus non enim praesent elementum facilisis leo vel. Eu non diam phasellus vestibulum lorem sed risus ultricies. Turpis massa sed elementum tempus. In tellus integer feugiat scelerisque. Quis vel eros donec ac odio tempor orci. Cursus mattis molestie a iaculis at erat. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Id donec ultrices tincidunt arcu non sodales neque.</p>
                    //   <p>Orci ac auctor augue mauris augue neque. Arcu cursus euismod quis viverra nibh cras pulvinar. Rhoncus mattis rhoncus urna neque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Morbi enim nunc faucibus a. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Non blandit massa enim nec dui nunc mattis. Volutpat maecenas volutpat blandit aliquam etiam. Erat velit scelerisque in dictum non consectetur a. Rhoncus mattis rhoncus urna neque. Aenean pharetra magna ac placerat vestibulum. Integer enim neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non arcu. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Cursus turpis massa tincidunt dui ut ornare.</p>
                    //   <Attachments />
                    // </> */}
      </div>
      <div className='project_milestones'>
              <h1>Milestones</h1>
              {/* <br /> */}
              <MilestonesBlock
                isVisible={true}
                project_id={sessionStorage.getItem("key")}
              />
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