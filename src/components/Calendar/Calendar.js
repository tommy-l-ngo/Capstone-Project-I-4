import Navbar from "../Dashboard/Navbar"
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import "react-datetime/css/react-datetime.css";
import AddMeeting from "./AddMeeting"
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";


export function Calendar() {
    // get current user details from auth
    const user = getAuth().currentUser;
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
        const email = user.email;
        const uid = user.uid;
        const displayName = user.displayName;
        //console.log("displayName:" + displayName);
    }
    else
    {
        console.log("No User");
    }

    const db = getDatabase();
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = React.useRef();
    const [userEUID, setUserEUID] = useState(user.displayName);
    const [userEvents, setUserEvents] = useState([]);
    let eventList = [];

    function getCalendarEUID(){
        // get calendar events of userEUID from database
        get(ref(db, "calendars/" + userEUID)).then((snapshot) => {
            if (snapshot.exists()) {
                //loop through calendar events from user
                snapshot.forEach( (eventShot) => {
                    var evMeetDate = eventShot.val().date;
                    var evMeetEndDate = eventShot.val().endDate;
                    let evProject = eventShot.val().project;
                    let evTime = eventShot.val().time;
                    var evTitle = evTime + " " + eventShot.val().title + " " + evProject;
                    var event = { title: evTitle, start: evMeetDate, end: evMeetEndDate, id:eventShot.key};
                    eventList.push(event);
                })
                console.log(eventList);
                setUserEvents(eventList);
            } else {
                console.log("No calendar data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }//getCalendarEUID()
    
    function updateCalendarEUID(){
        update(ref(db, "calendars/" + userEUID),{
            date: startDate,
            endDate: endDate,
            guests: meetGuests,
            project: meetProj,
            time: meetTime,
            title: meetTitle,
             notes: meetNotes
        }
        )
    }
    function deleteCalendarEUID(){
        remove(ref(db, "calendars/" + userEUID))

    }
    
    function eventClickFunc(ev)
    {   
        var eventKey = ev.event.id;
        // loop through userEvents, look for matching key(event id)
        for (var i=0; i<userEvents.length; i++){
            if (userEvents[i].id == eventKey)
            {
                console.log(userEvents[i]);
                alert(userEvents[i].id);
                deleteCalendarEUID(eventKey);
                break;
            }
        }
    }//eventClickFunc()
    
    useEffect(() => {
        getCalendarEUID();
    },[modalOpen]); //executes on both page load and modalOpen change

    return (
        <div style={{ backgroundColor: 'white' }}>
            <Navbar />
            <button color = "red" onClick={() => setModalOpen(true)}>Add Event</button>
            <div style={{ position: "relative", zIndex: 0, paddingTop: "20px" }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    // dateClick={handleDateclick}
                    events={userEvents}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                        
                      }}
                    eventClick={(e) => eventClickFunc(e)}
                />
            </div>
            <AddMeeting isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
        </div>
    )
}





// const auth = getAuth();
    // const euid = auth['apiKey'];
    // console.log(`const euid = auth; ${JSON.stringify(euid)}`);
    // console.log(`const auth = getAuth(); ${JSON.stringify(auth)}`);

    // setUserEUID(euid);
    // console.log(userEUID.eUID);
   

    

    // function handleDateclick(selection){ // "selection" object passed when a date is clicked on calendar
    //     // FIX ME: Custom pop-up box should be used instead of generic window prompt
    //     // meeting details
    //     const meetHost = userEUID;
    //     const meetGuests = ["exa0011", "exa0013"];
    //     const meetDate = selection.dateStr;
    //     const meetTime = "12:00";
    //     const meetProj = "Project 1"
    //     const meetTitle = window.prompt("Enter a title:","Meeting 1");
    //     const meetNotes = "None";
    //     const meetID = meetDate+"_"+meetTime+"_"+meetProj;// prevents duplicate meetings

    //     // add meeting to host calendar in database
    //     set(ref(db, "calendars/" + userEUID + "/" + meetID), {
    //         host: meetHost,
    //         guests: meetGuests,
    //         date: meetDate,
    //         time: meetTime,
    //         project: meetProj,
    //         title: meetTitle,
    //         notes: meetNotes,
    //         type: "meeting"
    //     });

    //     // add meeting to guest calendars in database
    //     for (var i=0; i<meetGuests.length; i++){
    //         set(ref(db, "calendars/" + meetGuests[i] + "/" + meetID), {
    //             host: meetHost,
    //             guests: meetGuests,
    //             date: meetDate,
    //             time: meetTime,
    //             project: meetProj,
    //             title: meetTitle,
    //             notes: meetNotes,
    //             type: "meeting"
    //         });
    //     }

    //     console.log("Meeting added");
    // }
