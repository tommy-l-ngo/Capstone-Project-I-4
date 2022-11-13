//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect } from 'react';
// import '../LiveChat/ChatPage.css';
import './Milestones.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Comments from "../Comments/Comments";
import FileUpload from "../FileUpload/FileUpload";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, set, push } from "firebase/database";
import InputField2 from '../Login/InputField2';

import CardItem from '../Dashboard/CardItem';
import '../Dashboard/Cards.css';
import MilestoneItem from './MilestoneItem';
// import { ChatSide } from './ChatSide';
// import { ChatMain } from './ChatMain';

// Gets current user
const dbRef = ref(getDatabase());
const db = getDatabase();

const user = getAuth().currentUser;
var name = "No user";
var currUserID;



function onSubmit() {



}





var key1;





function MilestonesBlock({ isVisible, project_id }) {
    var first = true;

    const [loggedIn, setLoggedIn] = useState(false);
    const [project, setProject] = useState({});

    const [projects, setProjects] = useState([]);
    const [display, setDisplay] = useState(false);
    const [projectID, setProjectID] = useState("");
    const [milestoneTitle, setMilestoneTitle] = useState("");
    const [milestones, setMilestones] = useState([]);

    const [inp1, setInp1] = useState("");
    const [inp2, setInp2] = useState("");
    const [inp3, setInp3] = useState("");
    const handleChange1 = event => {
        setInp1(event.target.value);
    };
    const handleChange2 = event => {
        setInp2(event.target.value);

    };
    const handleChange3 = event => {
        setInp3(event.target.value);

    };
    var projPath = "";
    const location = useLocation();
    const fullDataPath = location.pathname;
    const dataPath = fullDataPath.replace("/Projects/", '');
    if (project_id != "") {
        projPath = "projects/" + project_id + "";
        // alert(projPath);
    }
    // alert(project_id);
    const navigate = useNavigate();
    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
    function readMilestones() {
        // alert(milestones[0].name);
    }
    function addMilestone(p_key, p_name, m_name, m_description, m_date, m_complete,) {
        const user = getAuth().currentUser;
        // alert(project_id);
        if (user !== null) {
            const email = user.email;
            const displayName = user.displayName; // (euid)
        }
        else {
            console.log("No User");
        }
        if (isEmptyOrSpaces(m_name) || isEmptyOrSpaces(m_date)) {
            alert("Please add a title and date for the milestone.");
        }
        else {
            // alert(project_id);
            let dbRefMilestones = ref(db, "projects/" + project_id + "/milestones/");
            push(dbRefMilestones, {
                name: m_name,
                user_id: user.displayName,
                description: m_description,
                date: m_date,
                complete: false
            }).then(() => {
                // alert(project_id + "\n" + m_name)
                // alert(m_name + " pushed");
                // navigate("/Projects/" + p_name); //refresh page after adding new milestone 
                //console.log("navigating");
                window.location.reload();
            });
        }
    }






    useEffect(() => {
        if (location.state != null) {
            key1 = location.state.key;
        }
        //  alert("ID:" + project_id);

        // Get/Read Milestones
        var unsubcribe = getAuth().onAuthStateChanged(function (user) {
            if (user) {
                get(child(dbRef, "projects/" + location.state.key + "/milestones"))
                    .then((snapShot) => {
                        if (snapShot.exists()) {
                            // let project = {
                            //     key: snapShot.key,
                            //     text: snapShot.val().name,
                            //     desc: snapShot.val().description,
                            //     label: snapShot.val().date,
                            //     miles: snapShot.val().milestones,
                            //     src: "images/img-1.png"
                            //     //path: `/Projects/${subSnap.val().project_id}`  
                            // };
                            // setProject(project);

                            // Read and display user milestones
                            snapShot.forEach(userShot => {
                                const curr = userShot.val();

                                let mile1 = {
                                    key: userShot.key,
                                    name: curr.name,
                                    desc: curr.description,
                                    date: curr.date,
                                    done: curr.complete,
                                    user: curr.user_id,
                                    src: "images/img-1.png"
                                    //path: `/Projects/${subSnap.val().project_id}`  
                                };
                                // alert("k:" + mile1.key)
                                //console.log(userShot.key);
                                // alert(mile1.name);
                                // let mile2 = curr;
                                // if (first) {
                                setMilestones((miles) => [...miles, mile1]);
                                // }
                                // if (userShot.key == project_id) {
                                //     alert("Match: " + userShot.key +", "+ userShot.val().name);
                                // }
                                // if (curr.eUID != user.displayName && curr.eUID != "admin")
                                // {
                                // setChatList(chatList => [...chatList, curr])    
                                // }
                            })

                        }

                    })
            }

        })
    }, [])

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
            {/* <div className='milestoneTitle'>
                <h1>Milestones</h1>
            </div> */}
            <div className='labels'>
                <label htmlFor="milestoneName" className='label3'>
                    Title
                </label>
                <input
                    type={"text"}
                    id={"titleInp"}
                    name={"titleInp"}
                    onChange={handleChange1}
                    value={inp1}
                /><br></br>
                <label htmlFor="milestoneDate" className='label3'>
                    Date
                </label>
                <input
                    type={"text"}
                    id={"dateInp"}
                    name={"dateInp"}
                    onChange={handleChange2}
                    value={inp2}
                /><br></br>
                <label htmlFor="milestoneDesc" className='label3'>
                    Description
                </label>
                <input
                    type={"text"}
                    id={"descInp"}
                    name={"descInp"}
                    onChange={handleChange3}
                    value={inp3}
                />
            </div>
            <div className='buttonMilestone'>
                <button className='bt milestoneBtn' onClick={() => addMilestone(project_id, '', inp1, inp3, inp2, '')}>
                    Add milestone
                </button>

            </div>
            <div id="milestoneContainer">



                {/* <input
              name="milestoneName"
              id="milestoneName"
              className="form__field"
              type="text"
              placeholder="Milestone"
              onChange={(e) => {
                setMilestoneTitle(e.target.value);
                // clearErrorMessage();
              }}
            /> */}
                {/* <button class="addSubmit" onClick={onSubmit}>
            Submit
            </button>                 */}

                {milestones.map((item) => {
                    // alert(item.key)
                    // alert(item.name);
                    return (
                        //    <>asdf</>
                        <MilestoneItem
                            title={item.name}
                            date={item.date}
                            m_key={item.key}
                            description={item.desc}
                            projectID={project_id}
                        // label={item.date} 
                        // path={`/Projects/${project_path}`}
                        />
                    )
                })
                }

                {/* {milestones ? (


                    // <h4>Some milestone</h4>
                    milestones.map((item) => {
                        // alert(item.key)
                        // alert(item.name);
                        return (
                            //    <>asdf</>
                            <MilestoneItem
                                title={item.name}
                                date={item.date}
                                m_key={item.key}
                                description={item.desc}
                                projectID={project_id}
                            // label={item.date} 
                            // path={`/Projects/${project_path}`}
                            />
                        )
                    })

                ) : (
                    <><h4>No milestones available.</h4></>
                )} */}




            </div>


        </>
    );
}
export default MilestonesBlock;