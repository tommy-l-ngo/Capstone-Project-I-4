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
import { getDatabase, get, child, ref, onChildAdded, onChildChanged} from "firebase/database";
import { MessageContext } from '../Login/App';

// Gets current user
const db = getDatabase();
const dbRef = ref(db);
//const user = getAuth().currentUser;



export function ChatSide(props) {

    const [messageAlert, setMessageAlert] = useContext(MessageContext)
    const [chatList, setChatList] = useState([]);
    const [filteredChatList, setFilteredChatList] = useState([]);
    const [activeChats, setActiveChats] = useState({});
    const [newMessage, setNewMessage] = useState({});
    const [openTab, setOpenTab] = useState("Active Chats");
    const [searchText, setSearchText] = useState("");
    const [chatPerson, setChatPerson] = useState({});

    useEffect(() => {
        var unsubcribe = getAuth().onAuthStateChanged(function(user) {
            if (user) {
                get(child(dbRef, "users/"))
                    .then((snapShot) => {
                        if (snapShot.exists())
                        {
                            var defaultChat;
                            //console.log(snapShot);
                            snapShot.forEach(userShot => {
                                //console.log(userShot.key);
                                const curr = userShot.val();
                                if (curr.eUID != user.displayName && curr.eUID != "admin")
                                {
                                    if (defaultChat == null)
                                    {
                                        defaultChat = curr;
                                        props.defaultChat(defaultChat);
                                        setChatPerson(defaultChat);
                                    }
                                    setChatList(chatList => [...chatList, curr])
                                    setActiveChats(activeChats => ({ ...activeChats, [curr.eUID]: false }));
                                    setNewMessage(newMessage => ({ ...newMessage, [curr.eUID]: false }));
                                }
                            })


                        }
                    
                    })
                    .then(() => {
                        const dbMessagesRef = ref(db, "messages");
                        var defaultChat;
                        onChildAdded(dbMessagesRef, (snapShot) => {
                            const dbMessage = snapShot.val();

                            if (dbMessage.from == user.displayName || dbMessage.to == user.displayName) {
                                let other_eUID;
                                (dbMessage.from == user.displayName) ? (other_eUID = dbMessage.to) : (other_eUID = dbMessage.from);
                                if (dbMessage.to == user.displayName && dbMessage.seen == false)
                                {
                                    setNewMessage(newMessage => ({ ...newMessage, [other_eUID]: true }));
                                    setMessageAlert(true);
                                }
                                setActiveChats(activeChats => ({ ...activeChats, [other_eUID]: true }));
                                if (defaultChat == null)
                                {
                                    get(child(dbRef, "users/" + other_eUID))
                                    .then((snap) => {
                                        if (defaultChat == null)
                                            defaultChat = snap.val(); 
                                    })
                                    .then(() => {
                                        props.defaultChat(defaultChat);
                                        setChatPerson(defaultChat);
                                    })
                                    
                                }
                            }
                        })

                        onChildChanged(dbMessagesRef, (snapShot) => {
                           //console.log(snapShot.val())
                           const dbMessage = snapShot.val();

                           if (dbMessage.from == user.displayName || dbMessage.to == user.displayName)
                           {
                               let other_eUID;
                               (dbMessage.from == user.displayName) ? (other_eUID = dbMessage.to) : (other_eUID = dbMessage.from);
                               if (dbMessage.to == user.displayName && dbMessage.seen == true)
                               {
                                    setNewMessage(newMessage => ({...newMessage, [other_eUID]: false}));  
                               }
                           }
                        })
                    })
          }

      })
    
      //unsubcribe();

    }, []);

    useEffect(() => {
        var alert = false;
        for (const key in newMessage) {
            if (newMessage[key] == true) {
                alert = true
                break;
            }
        }
        setMessageAlert(alert);
    }, [newMessage]);
    
    /*
    function SendChatInfo()
    {
        props.chatInfo(element)
    }
*/
    
    function HandleSearch(e)
    {
        const searchText = e.target.value;
        setSearchText(searchText);

        if (!searchText)
        {
            setFilteredChatList([]);
            return;
        }

        const filtered = chatList.filter((element, index) => {
            
            if (openTab == "Active Chats" && activeChats[element.eUID] == false)
                return false;

            const eUID = element.eUID.toLowerCase();
            const firstName = element.firstName.toLowerCase();
            const lastName = element.lastName.toLowerCase();
            const email = element.email.toLowerCase();

            return ((eUID.indexOf(searchText) > -1) || (firstName.indexOf(searchText) > -1) ||
                    (lastName.indexOf(searchText) > -1) || (email.indexOf(searchText) > -1))

        })

        setFilteredChatList(filtered);
    }

    function HandleSwitch(e, tab)
    {
        const len = e.target.parentElement.children.length;
        for (let i = 0; i < len; ++i)
        {
            e.target.parentElement.children[i].className = "tab";
        }
        e.target.className = "clicked";

        if (tab == "active")
        {
            setOpenTab("Active Chats");
        }
        else if (tab == "all")
        {
            setOpenTab("All Users");
        }

        //handling search again if there is still text in search bar after switching
        if (!searchText)
        {
            setFilteredChatList([]);
            return;
        }
        const filtered = chatList.filter((element, index) => {
            
            if (tab == "active" && activeChats[element.eUID] == false)
                return false;

            const eUID = element.eUID.toLowerCase();
            const firstName = element.firstName.toLowerCase();
            const lastName = element.lastName.toLowerCase();
            const email = element.email.toLowerCase();

            return ((eUID.indexOf(searchText) > -1) || (firstName.indexOf(searchText) > -1) ||
                    (lastName.indexOf(searchText) > -1) || (email.indexOf(searchText) > -1))

        })

        setFilteredChatList(filtered);
    }
  
    var numChats = 0;

    return (
        <aside className="chatAside">
            <header>
                <input type="text" value={searchText} onChange={HandleSearch} placeholder="search"/>
            </header>

            <div className="tabs">
                <button className="clicked" onClick={(e) => HandleSwitch(e, "active")}>Active Chats</button>
                <button className="tab" onClick={(e) => HandleSwitch(e, "all")}>All Users</button>
            </div>
        
                <ul>
                    {(searchText && filteredChatList.length == 0) && (<h3>No Results</h3>)}
                    
                    {(!searchText && openTab == "Active Chats" && chatList.filter((e) => {
                        if (activeChats[e.eUID] == true)
                            return true;
                        }).length == 0) 
                        && (<h3>No Active Chats</h3>)}

                    {(searchText) ?
                    (filteredChatList.map((element, index) => {

                            var clicked;
                            (chatPerson.eUID == element.eUID) ? (clicked = true) : (clicked = false);
    
                            return (<li className={clicked ? ("clicked") : ("")} onClick={(e) => { setChatPerson(element); setSearchText(""); props.chatInfo(element) }}>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                                <div>
                                    <h2>{element.firstName}</h2>
                                    <h3 className="eUID">{element.eUID}</h3>
                                    {(newMessage[element.eUID]) &&
                                        (<h3>
                                            <span className="status blue"></span>
                                            New Messages
                                        </h3>)}
                                </div>
                            </li>)
                        }))
                        :
                        (chatList.map((element, index) => {
                             
                            if (openTab == "Active Chats" && activeChats[element.eUID] == false)
                                return;
                            
                            var clicked;
                            (chatPerson.eUID == element.eUID) ? (clicked = true) : (clicked = false);
    
                            return (<li className={clicked ? ("clicked") : ("")} onClick={(e) => { setChatPerson(element); props.chatInfo(element) }}>
                                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="" />
                                <div>
                                    <h2>{element.firstName}</h2>
                                    <h3 className="eUID">{element.eUID}</h3>
                                    {(newMessage[element.eUID]) &&
                                        (<h3>
                                            <span className="status blue"></span>
                                            New Messages
                                        </h3>)}
                                </div>
                            </li>)
                        }))}
                </ul>
            

        </aside>
      );
}
