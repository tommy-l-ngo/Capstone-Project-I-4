import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState } from 'react';
import '../Dashboard/Dashboard.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { Link, useParams } from 'react-router-dom';
import './ProjectPage.css';
import Comments from "../Comments/Comments";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";

const dbRef = ref(getDatabase());
const user = getAuth().currentUser;
var name = "No user";
var currUserID;
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

function ProjectPage() {
    //Gets Project Id
    const { id } = useParams();
    console.log(id)
    
    //Gets data based on project Id
    const getData = data.cardData[id - 1];

    console.warn(getData);
    return (
        <div>
            <Navbar />
            <div className='project_details'>
                <h1>{getData.text}</h1>
                <h3>{getData.label}</h3>
                
                <p>{getData.desc}</p>
            </div>
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
                (<Comments currentUserId={0}/*{user.uid}*/  />) : 
                (<Comments currentUserId={user.uid}  />)
                }
            </div>
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