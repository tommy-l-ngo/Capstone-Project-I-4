//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect } from 'react';
import './ChatPage.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { useParams, useLocation } from 'react-router-dom';
import Comments from "../Comments/Comments";
import FileUpload from "../FileUpload/FileUpload";
import { getAuth } from "firebase/auth";
import { getDatabase, get, child, ref} from "firebase/database";

// Gets current user
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;



export function ChatSide() {

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        //getting the project by key
        var unsubcribe = getAuth().onAuthStateChanged(function(user) {
            if (user) {
                get(child(dbRef, "users/"))
                    .then((snapShot) => {
                        if (snapShot.exists())
                        {
                            //console.log(snapShot);
                            snapShot.forEach(userShot => {
                                //console.log(userShot.key);
                                const curr = userShot.val();
                                if (curr.eUID != user.displayName && curr.eUID != "admin")
                                {
                                    setChatList(chatList => [...chatList, curr])    
                                }
                            })
                        }
                    
                })
          }

      })
    
      //unsubcribe();

    }, []);

  
    return (
        <aside className="chatAside">
            <header>
                <input type="text" placeholder="search"/>
            </header>
            
            <ul>
                {chatList.map((element, index) => (
                    <li>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
                        <div>
                            <h2>{element.firstName}</h2>
                            <h3 className="eUID">{element.eUID}</h3>
                            <h3>
                                <span className="status orange"></span>
                                offline
                            </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
      );
}
