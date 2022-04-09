import React, { Component } from 'react'
import '../Dashboard/Dashboard.css';
import Navbar from '../Dashboard/Navbar'
import data from '../Dashboard/data';

export default class ProjectPage extends Component {
    render() {
        let getId = this.props.match.params.id;

        const getData = data.cardData[getId - 1];

        console.warn(getData);
        return (
            <div>
                <Navbar />
                <h1>Project Details</h1>
            </div>
        )
    }
}