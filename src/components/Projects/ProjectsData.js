import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";
import { Component } from "react";

export class ProjectsData extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        const dbRef = ref(getDatabase());
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
                        });
                    }

                });
                this.setState({
                    projects: projects
                });
            }
        })
    }

    render() {
        return(
            <div></div>
        );
    }
}

