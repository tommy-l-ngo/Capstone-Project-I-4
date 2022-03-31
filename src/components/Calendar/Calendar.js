import Navbar from "../Dashboard/Navbar"
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
export function Calendar() {
    return (<div style={{backgroundColor: 'white' }}>
        <>
            <Navbar />
            <FullCalendar
                
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
        </>

    </div>
    )
}

