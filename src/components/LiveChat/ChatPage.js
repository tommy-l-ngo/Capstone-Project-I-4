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
import { getDatabase, get, child, ref } from "firebase/database";
import { ChatSide } from './ChatSide';
import { ChatMain } from './ChatMain';

// Gets current user
const dbRef = ref(getDatabase());
const user = getAuth().currentUser;



export function ChatPage() {


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

  
    return (
        <>
            <Navbar />

            <div id="#container">
                <ChatSide/>
                <ChatMain/>
            </div>    
            </>
      );
}
