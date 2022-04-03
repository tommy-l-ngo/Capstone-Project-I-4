import Modal from 'react-modal';
import Datetime from 'react-datetime';
import React, { useState } from 'react'
import { Container } from "react-bootstrap";
import { getDatabase, set, ref} from "firebase/database";

// Exports data to database
export default function ({ isOpen, onClose}) {
    const [meetHost, setHost] = useState(" ");
    const [meetGuests, setGuests] = useState([]);
    const [meetDate, setMeetDate] = useState(new Date());
    const [meetTime, setMeetTime] = useState(new Date());
    const [meetProj, setProj] = useState(" ");
    const [meetTitle, setTitle] = useState(" ");
    const [meetNotes, setNotes] = useState(" ");
    const meetID = meetDate + "_" + meetTime + "_" + meetProj;

    const db = getDatabase();
    const userEUID = "exa0012"; //FIX ME: Still strying to figure out how to add the current user euid.

    function onSubmit() {
        set(ref(db, "calendars/" + userEUID + "/" + meetID), {
            host: meetHost,
            guests: meetGuests,
            date: meetDate,
            time: meetTime,
            project: meetProj,
            title: meetTitle,
            notes: meetNotes,
            type: "meeting"
        });
        onClose();

         // add meeting to guest calendars in database
         for (var i=0; i<meetGuests.length; i++){
            set(ref(db, "calendars/" + meetGuests[i] + "/" + meetID), {
                host: meetHost,
                guests: meetGuests,
                date: meetDate,
                time: meetTime,
                project: meetProj,
                title: meetTitle,
                notes: meetNotes,
                type: "meeting"
            });
        }
    }

<<<<<<< HEAD
    function cancelSubmit() {
        onClose();
    }

=======
>>>>>>> 0f67049caebe6ac985b6a4a193408c2aa085346e
    // FIXME: Form, please style accordingly.
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Container className="d-flex align-item-center justify-content-center">
                <form onSubmit={onSubmit} style={{ margin: "50px" }}>
                    <div>
                        <h6>Host</h6>
                        <input placeholder="Host" value={meetHost} onChange={(e) => setHost(e.target.value)} />
                    </div>
                    <div>
                        <h6>Guests</h6>
                        <input placeholder="Guests" value={meetGuests} onChange={(e) => setGuests(e.target.value)} />
                    </div>
                    <div>
                        <h6>Date</h6>
                        <Datetime value={meetDate} onChange={date => setMeetDate(date)} />
                    </div>
                    <div>
                        <h6>Time</h6>
                        <Datetime value={meetTime} onChange={date => setMeetTime(date)} />
                    </div>
                    <div>
                        <h6>Project</h6>
                        <input placeholder="Project" value={meetProj} onChange={(e) => setProj(e.target.value)} />
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
<<<<<<< HEAD
                    <button onClick={cancelSubmit}>Cancel</button>
=======
>>>>>>> 0f67049caebe6ac985b6a4a193408c2aa085346e
                </form>
            </Container>
        </Modal>
    )
}