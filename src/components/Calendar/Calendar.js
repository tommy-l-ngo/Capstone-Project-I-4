import Navbar from "../Dashboard/Navbar";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import "react-datetime/css/react-datetime.css";
import AddMeeting from "./AddMeeting";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getAuth, auth, onAuthStateChanged } from "firebase/auth";
import EditMeeting from "./EditMeeting";
import "./EditMeeting.css";

export function Calendar() {
  // get current user details from auth
  const user = getAuth().currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
  } else {
    console.log("No User");
  }

  const db = getDatabase();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const calendarRef = React.useRef();
  const [userEUID, setUserEUID] = useState(user.displayName);
  const [userEvents, setUserEvents] = useState([]);
  let eventList = [];
  const [modalData, setModalData] = useState("");

  function getCalendarEUID() {
    // get calendar events of userEUID from database
    get(ref(db, "calendars/" + userEUID))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //loop through calendar events from user
          snapshot.forEach((eventShot) => {
            var evMeetDate = eventShot.val().date;
            var evMeetEndDate = eventShot.val().endDate;
            let evProject = eventShot.val().project;
            let evTime = eventShot.val().time;
            var evTitle =
              evTime + "-" + eventShot.val().title + "," + evProject;
            var event = {
              title: evTitle,
              start: evMeetDate,
              end: evMeetEndDate,
              id: eventShot.key,
            };
            eventList.push(event);
          });
          // console.log(eventList);
          setUserEvents(eventList); // add events to calendar
        } else {
          console.log("No calendar data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } //getCalendarEUID()

  //  open modal2 (meeting details) on event click
  function eventClickFunc(ev) {
    var eventKey = ev.event.id;
    // loop through userEvents, look for matching key(event id)
    for (var i = 0; i < userEvents.length; i++) {
      if (userEvents[i].id == eventKey) {
        console.log(userEvents[i].id);
        setModalData(eventKey);
        setModalOpenEdit(true);
        //deleteCalendarEUID(eventKey);
        break;
      }
    }
  } //eventClickFunc()

  useEffect(() => {
    getCalendarEUID();
  }, [modalOpen, modalOpenEdit]); //executes on both page load and modalOpen/modalOpenEdit change

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <button class="addEvent" color="red" onClick={() => setModalOpen(true)}>
        Add Meeting
      </button>
      <div style={{ position: "relative", zIndex: 0, paddingTop: "20px" }}>
        <FullCalendar
          aspectRatio={2.7}
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          // dateClick={handleDateclick}
          events={userEvents}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(e) => eventClickFunc(e)}
        />
      </div>
      <AddMeeting isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <EditMeeting
        isOpen={modalOpenEdit}
        onClose={() => setModalOpenEdit(false)}
        data={modalData}
      />
    </div>
  );
}
