import Navbar from "../Dashboard/Navbar"
import React , {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { getDatabase, set, ref, get } from "firebase/database";

export function Calendar() {
    const db = getDatabase();
    const userEUID = "exa0012"; //FIX ME: replace with logged in user
    const [userEvents, setUserEvents] = useState("");
   
    function handleDateclick(selection){ // "selection" object passed when a date is clicked on calendar
        // FIX ME: Custom pop-up box should be used instead of generic window prompt
        // meeting details
        const meetHost = userEUID;
        const meetGuests = "exa0011, exa0013";
        const meetDate = selection.dateStr;
        const meetTime = "12:00";
        const meetProj = "Project 1"
        const meetTitle = window.prompt("Enter a title:","Meeting 1");
        const meetNotes = "None";
        const meetID = meetDate+"_"+meetTime+"_"+meetProj;// prevents duplicate meetings
        
        // add meeting to database
        set(ref(db, "calendars/" + userEUID + "/" + meetID), {
            host: meetHost,
            guests: meetGuests,
            date: meetDate,
            time: meetTime,
            project: meetProj,
            title: meetTitle,
            notes: meetNotes
        });
        console.log("Meeting added");
    }// handleDateClick

    function testFunction(){
        console.log("Hello");
    }

    // get calendar events of userEUID from database
    get(ref(db, "calendars/" + userEUID)).then((snapshot) => {
        if (snapshot.exists()) {
            //loop through calendar events from user
            var events = []
            snapshot.forEach(function (snapshot){
                var evDate = snapshot.val().date;
                var evTitle = snapshot.val().time + " -- " + snapshot.val().title;
                var event = { title: evTitle, date: evDate };
                events.push(event)
            })
            setUserEvents(events);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });

    return (<div style={{backgroundColor: 'white' }}>
        <>
            <Navbar />
            <button onClick={testFunction}>TEST BUTTON</button>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateclick}
                events = {userEvents}
            />
        </>

    </div>
    )
}

