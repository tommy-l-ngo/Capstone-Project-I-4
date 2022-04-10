import React, { Component } from 'react';
import '../Dashboard/Dashboard.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { Link, useParams } from 'react-router-dom';
import './ProjectPage.css';
import Comments from "../Comments/Comments";

function ProjectPage() {
    const { id } = useParams();
    console.log(id)
    
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
            <div className='project_comments'>
                <Comments
                currentUserId="1"
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