//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect, useContext } from 'react';
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

    const [chatPerson, setChatPerson] = useState({});

    useEffect(() => {
        document.body.style.background = "#3b3e49";
        //document.body.style.height = "100%";

        return () => {document.body.style.backgroundColor = "white"}
    }, [])


  
    return (
        <>
            
            <Navbar />
            
            <div>
                <ChatSide defaultChat={setChatPerson} chatInfo={setChatPerson}/>
                <ChatMain chatPerson={chatPerson}/>
            </div>    
            </>
      );
}
