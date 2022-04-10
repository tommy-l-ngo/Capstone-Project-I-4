import Navbar from "../Dashboard/Navbar"
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { getDatabase, set, ref, get } from "firebase/database";
import "react-datetime/css/react-datetime.css";
import AddMeeting from "./AddMeeting"
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";//


export function Calendar() {
    const user = getAuth().currentUser;
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
        const email = user.email;
        const uid = user.uid;
        //console.log("email:", email)
    }
    else
    {
        //console.log("No User");
    }
    const db = getDatabase();
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = React.useRef();
    const [userEUID, setUserEUID] = useState("exa0012"); //FIX ME: replace with logged in user
    const [userEvents, setUserEvents] = useState(" ");
    console.log("displayName:", user.displayName)


    // get calendar events of userEUID from database
    get(ref(db, "calendars/" + userEUID)).then((snapshot) => {
        if (snapshot.exists()) {
            //loop through calendar events from user
            let eventList = []
            snapshot.forEach( (eventShot) => {
                var evMeetDate = eventShot.val().date;
                var evMeetEndDate = eventShot.val().endDate;
                let evProject = eventShot.val().project;
                let evTime = eventShot.val().time;
                var evTitle = evTime + " " + eventShot.val().title + " " + evProject;
                var event = { title: evTitle, start: evMeetDate, end: evMeetEndDate};
                eventList.push(event)
            })
            setUserEvents(eventList);
        } else {
            console.log("No calendar data available");
            let eventList = [];
        }
    }).catch((error) => {
        console.error(error);
    });

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
                />
            </div>
            <AddMeeting isOpen={modalOpen} onClose={() => setModalOpen(false)}  />
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
