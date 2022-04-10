import Modal from 'react-modal';
import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { getDatabase, set, ref, get} from "firebase/database";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import { getAuth, auth } from "firebase/auth";
import Select from 'react-select';

function getCurrentUser()
{
    const user = getAuth().currentUser;
    return user;
}


// Exports data to database
export default function ({ isOpen, onClose}) {
    const [meetDate, setMeetDate] = useState(new Date());
    const [meetEndDate, setMeetEndDate] = useState(new Date());
    const [meetHost, setHost] = useState(" ");
    const [meetGuests, setGuests] = useState([]);
    const [meetProj, setProj] = useState(" ");
    const [meetTime, setTime] = useState('10:00');
    const [meetTitle, setTitle] = useState(" ");
    const [meetNotes, setNotes] = useState(" ");

    

    let meetDateISO = meetDate.toISOString();
    let meetEndDateISO = meetEndDate.toISOString();

    const startDate = meetDateISO.substring(0, 10);
    const endDate = meetEndDateISO.substring(0, 10);
    const meetID = startDate + "_" + meetTime + "_" + meetProj;

    const db = getDatabase();
    let projectList = []
    const userEUID = getCurrentUser;
    
    get(ref(db, "projects/")).then((snapshot) => {
        if (snapshot.exists()) {
            //loop through projects
            
            snapshot.forEach( (snap) => {
                projectList.push(snap.key);
            })
            //console.log("Project List:", projectList);
        } else {
            console.log("No project data available");
            let projectList = [];
        }
    }).catch((error) => {
        console.error(error);
    });

    function onSubmit() {
        set(ref(db, "calendars/" + userEUID + "/" + meetID), {
            date: startDate,
            endDate: endDate,
            host: userEUID,
            guests: meetGuests,
            project: meetProj,
            time: meetTime,
            title: meetTitle,
            notes: meetNotes,
            type: "meeting"
        });
        onClose();

         // add meeting to guest calendars in database
        //  for (var i=0; i<meetGuests.length; i++){
        //     set(ref(db, "calendars/" + meetGuests[i] + "/" + meetID), {
        //         host: meetHost,
        //         guests: meetGuests,
        //         date: meetDate,
        //         endDate: meetEndDate,
        //         project: meetProj,
        //         title: meetTitle,
        //         notes: meetNotes,
        //         type: "meeting"
        //     });
        // }
    }

    function cancelSubmit() {
        onClose();
    }

    // FIXME: Form, please style accordingly.
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container className="d-flex align-item-center justify-content-center">
                {/* <DatePickerButton /> */}
                <form onSubmit={onSubmit} style={{ margin: "50px" }}>
                    <div>
                        <h6>Host</h6>
                        <input placeholder={userEUID} value={userEUID} disabled="true"/*onChange={(e) => setHost(e.target.value)} dateFormat='dd/MM/yyyy'*/ />
                    </div>
                    <div>
                        <h6>Guests</h6>
                        <input placeholder="Guests" value={meetGuests} onChange={(e) => setGuests(e.target.value)} />
                    </div>
                    <div>
                        <h6>Start Date</h6>
                         <DatePicker selected={meetDate} onChange={date => setMeetDate(date)}/> 
                        {/* <Datetime value={meetDate} onChange={date => setMeetDate(date)} /> */}
                    </div>
                    <div>
                        <h6>End Date</h6>
                        <DatePicker selected={meetEndDate} onChange={date => setMeetEndDate(date)}/>

                        {/* <Datetime value={meetEndDate} onChange={date => setMeetEndDate(date)} /> */}
                    </div>
                    <div>
                        <h6>Time</h6>
                        <TimePicker selected={meetTime} onChange={time => setTime(time)}/>
                    </div>
                    <div>
                        <h6>Project</h6>
                        <Select placeholder="Project" options = {projectList} />
                    </div>
                    <div>
                        <h6>Title</h6>
                        <input placeholder="Title" value={meetTitle} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <h6>Notes</h6>
                        <input placeholder="Notes" value={meetNotes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <button onClick={onSubmit}>Submit</button>
                    <button onClick={cancelSubmit}>Cancel</button>
                </form>
            </Container>
        </Modal>
    )
}