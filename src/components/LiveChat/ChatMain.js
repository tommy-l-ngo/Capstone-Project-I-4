//import React, { Component } from 'react';
import { Button } from '../Dashboard/Button';
import { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import Navbar from '../Dashboard/Navbar';
import data from '../Dashboard/data';
import { useParams, useLocation } from 'react-router-dom';
import Comments from "../Comments/Comments";
import FileUpload from "../FileUpload/FileUpload";
import { getAuth } from "firebase/auth";
import { getDatabase, get, query, ref, onChildAdded, orderByChild, limitToLast, push, set } from "firebase/database";
import { ChatFeed, Message } from 'react-chat-ui';
import { width } from 'dom-helpers';

// Gets current user


/*
    db message structure =
    [key]
    {
        "from": 
        "to": 
        "message":
        "timestamp":

    }
*/



export function ChatMain(props) {

    const db = getDatabase();
    const dbMessagesRef = ref(db, "messages");
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);

    const user = getAuth().currentUser;
    //const [pushRef, setPushRef] = useState(ref(db));
    var pushRef;
    const unsubscribe = useRef(() => { });

    //called every time user switches betweeen chats
    useEffect(() => {
        //resetting everything
        setMessages([]); 
        setMessageText("");
        var first = true;
        unsubscribe.current(); //unsubscribing from listener of last conversation (THIS IS VERY IMPORTANT)
        //setFirstCall(true);

        //load all messages from db for given conversation
        const loadDbMessagesQuery = query(dbMessagesRef, orderByChild('timestamp'));
        get(loadDbMessagesQuery)
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    //console.log("empty");
                    first = false;
                    return;
                }
                
                snapshot.forEach(snapshot1 => {
                    if (!snapshot1.exists())
                        return;

                    const dbMessage = snapshot1.val();

                    //conditional to only collect messages for the given chat/conversation
                    if ((dbMessage.from == user.displayName || dbMessage.from == props.chatPerson.eUID) &&
                        (dbMessage.to == user.displayName || dbMessage.to == props.chatPerson.eUID))
                    {
                        var message = new Message({id:0, message:""});
                        (dbMessage.from == user.displayName) ? (message.id = 0) : (message.id = 1);
                        message.message = dbMessage.message;
                        (dbMessage.from == user.displayName) ? (message.senderName = null) : (message.senderName = props.chatPerson.firstName);
                        setMessages(messages => [...messages, message]);

                        if (dbMessage.to == user.displayName && dbMessage.seen == false)
                        {
                            set(ref(db, "messages/" + snapshot1.key), { ...dbMessage, seen: true });
                        }
                    }
                });
            })
            //after loading conversation, this sets up a new listener to listen for newly added messages
            .then(() => {
                //if (!props.chatPerson.eUID || mounted.current)
                    //return;
                
                //mounted.current = true;
                //const chatPerson = props.chatPerson;
            
                const lastDbMessageQuery = query(dbMessagesRef, limitToLast(1));
                //adding new listener and saving its unsubscribe function in a ref.
                //We need this unsubscribe function to remove this listener when moving
                //to a new conversation.
                unsubscribe.current = onChildAdded(lastDbMessageQuery, (snapshot, prevChildKey) => {
                    if (first)
                    {
                        console.log("first call");
                        //setFirstCall(false);
                        first = false;
                        return;
                    }
                    if (!snapshot.exists() || snapshot.key == prevChildKey)
                        return;
        
                    //console.log("another call");
                    const dbMessage = snapshot.val();
                    //conditional to only collect the new message if it is for the given chat/conversation
                    if ((dbMessage.from == user.displayName || dbMessage.from == props.chatPerson.eUID) &&
                        (dbMessage.to == user.displayName || dbMessage.to == props.chatPerson.eUID))
                    {
                        var message = new Message({id:0, message:""});
                        (dbMessage.from == user.displayName) ? (message.id = 0) : (message.id = 1);
                        message.message = dbMessage.message;
                        (dbMessage.from == user.displayName) ? (message.senderName = null) : (message.senderName = props.chatPerson.firstName);
                        setMessages(messages => [...messages, message]);

                        if (dbMessage.to == user.displayName && dbMessage.seen == false)
                        {
                            set(ref(db, "messages/" + snapshot.key), { ...dbMessage, seen: true });
                        }
                    }
                    //first = true;
                });
            })
            .catch(err => {
                console.log(err.message);
                first = false;
            })
    }, [props.chatPerson]);

/*
    //listens for a new message added
    const mounted = useRef(false);
    useEffect(() => {
        if (!props.chatPerson.eUID || mounted.current)
            return;
        
        mounted.current = true;
        //const chatPerson = props.chatPerson;
    
        const lastDbMessageQuery = query(dbMessagesRef, limitToLast(1));
        onChildAdded(lastDbMessageQuery, (snapshot, prevChildKey) => {
            if (first)
            {
                console.log("first call");
                //setFirstCall(false);
                first = false;
                return;
            }
            if (!snapshot.exists() || snapshot.key == prevChildKey)
                return;
            
            console.log("another call");
            //console.log(snapshot.val());
            //console.log("from: " + snapshot.val().from);
  
            
            const dbMessage = snapshot.val();
            console.log("chatPerson first name: " + props.chatPerson.eUID);
            //conditional to only collect messages for the given chat/conversation
            if ((dbMessage.from == user.displayName || dbMessage.from == props.chatPerson.eUID) &&
                (dbMessage.to == user.displayName || dbMessage.to == props.chatPerson.eUID))
            {
                var message = new Message({id:0, message:""});
                (dbMessage.from == user.displayName) ? (message.id = 0) : (message.id = 1);
                message.message = dbMessage.message;
                (dbMessage.from == user.displayName) ? (message.senderName = null) : (message.senderName = props.chatPerson.firstName);
                setMessages(messages => [...messages, message]);
            }
            //first = true;
        });
        
     }, [props.chatPerson]);
    
*/
    function HandleChange(e)
    {
        setMessageText(e.target.value);
    }

    function HandleSend()
    {
        const dbMessage = {
            from: user.displayName,
            to: props.chatPerson.eUID,
            message: messageText,
            timestamp: Date.now(),
            seen: false
        };

        setMessageText("");
        //setFirstCall(false);
        //first = false;


        pushRef = push(dbMessagesRef, dbMessage)
            /*
            .then((pushRef) => {
                setPushRef(pushRef);
            })
            */
        
    }
  
    return (
        <main className="chatMain">
        <header>
            <div>
                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt=""/>
                <span><h2>Chat with {props.chatPerson.firstName }</h2></span>
            </div>
        </header>
        <div id="chat">
                <ChatFeed
                    messages={messages}
                    bubbleStyles={{
                        text: {
                          fontSize: 20
                        },
                        chatbubble: {
                          borderRadius: 70,
                            padding: 20,
                        },
                      }}
                />
        </div>
        
        <footer>
                <textarea placeholder="Type your message" value={messageText} onChange={HandleChange}></textarea>
                {/*
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""/>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""/>
                */}
                <button onClick={HandleSend} disabled={messageText ? (false) : (true)}>
                    Send
                </button>
        </footer>
            

            {/*
        <ul id="chat">
            <li class="you">
                <div class="entete">
                    <span class="status green"></span>
                    <h2>Vincent</h2>
                    <h3>10:12AM, Today</h3>
                </div>
                <div class="message">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </li>
            <li class="me">
                <div class="entete">
                    <h3>10:12AM, Today</h3>
                    <h2>Vincent</h2>
                    <span class="status blue"></span>
                </div>
                
                <div class="message">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </li>
            <li class="me">
                <div class="entete">
                    <h3>10:12AM, Today</h3>
                    <h2>Vincent</h2>
                    <span class="status blue"></span>
                </div>
                
                <div class="message">
                    OK
                </div>
            </li>
            <li class="you">
                <div class="entete">
                    <span class="status green"></span>
                    <h2>Vincent</h2>
                    <h3>10:12AM, Today</h3>
                </div>
                
                <div class="message">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </li>
            <li class="me">
                <div class="entete">
                    <h3>10:12AM, Today</h3>
                    <h2>Vincent</h2>
                    <span class="status blue"></span>
                </div>
                
                <div class="message">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
            </li>
            <li class="me">
                <div class="entete">
                    <h3>10:12AM, Today</h3>
                    <h2>Vincent</h2>
                    <span class="status blue"></span>
                </div>
                
                <div class="message">
                    OK
                </div>
            </li>
        </ul>
        */}
    </main>
      );
}
