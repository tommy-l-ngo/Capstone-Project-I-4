import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

// main implementation. using selected and onChange as main props to get and change the selected date value
const Picker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return <div>
    <DatePicker 
    selected={startDate} 
    onChange={date => setStartDate(date)} 
    />
</div>
    
};

export default Picker;