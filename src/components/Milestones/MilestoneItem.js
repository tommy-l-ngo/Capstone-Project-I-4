import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { getDatabase, get, child, ref, set, push, remove, update } from "firebase/database";

import "./Milestones.css";
import { click } from '@testing-library/user-event/dist/click';
const db = getDatabase();
const dbRef = ref(getDatabase());


function p2Num(p) {
  if (p == "Low")
    return 0;
  else if (p == "Medium")
    return 1;
  else if (p == "High")
    return 2;
  else if (p == "Critical")
    return 3;
}

function MilestoneItem({ title, date, m_key, description, projectID, priority, complete }) {          //Code to make page scroll to top
  // console.log(title + ", " + complete);
  const mRef = useRef();
  const [mousePos, setMousePos] = useState({});

  const [finished, setFinished] = useState(complete);
  const [clicking, setClicking] = useState(false);
  // alert(priority);
  const [dropdown, setDropdown] = useState({ value: "" + priority });

  // let dbRef0 = ref(db, "projects/" + projectID + "/milestones/" + m_key);
  // const _complete = ref.on('complete', (snapshot) => {
  //   console.log(snapshot.val());
  // }, (errorObject) => {
  //   console.log('The read failed: ' + errorObject.name);
  // });
  // Handles changing the dropdown (priority) value. 
  const changeDropdown = event => {
    setDropdown({ value: event.target.value });
    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
    // Update database to new value
    update(dbRefMilestone, {
      priority: event.target.value,
      urgency: p2Num(event.target.value)
    }).then(() => {
      // alert("Data updated");
      window.location.reload();
    });
  };
  var initialMouse = { x: 0, y: 0 };

  var initialMilestone = {};

  // TODO: Still in progress: handling click and drag to rearrange milestones order.
  const _handleMouseUp = (event) => {
    // alert(mRef.current.style.left);
    // alert(initialMilestone.left);
    // mRef.current.style.left = initialMilestone.left;
    setClicking(false);
  }
  const _handleMouseDown = (event) => {
    initialMouse = { x: event.pageX, y: event.pageY };
    initialMilestone = { left: mRef.current.style.left, top: mRef.current.style.top };
    setClicking(true);
  }


  // Remove the milestone
  function deleteItem() {
    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
    // Remove from database
    remove(dbRefMilestone).then(() => {
      // alert("location removed");
      window.location.reload();
    });

  }

  // Change between finished/unfinished
  function toggleDone() {
    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
    // Update database with new value
    update(dbRefMilestone, { complete: !finished }).then(() => {
      // alert("Data updated");
      // complete = !finished;
      setFinished(!finished);
      window.location.reload();
    });
  }

  // TODO: Still in progress: handling click and drag to rearrange milestones order.
  function handleMouseDown(event) {
    // event.stopPropogation()
    // event.preventDefault()
    // alert(event.clientX);
    setClicking(true);
  };

  // TODO: Still in progress: handling click and drag to rearrange milestones order.
  function handleMouseMove(event) {
    var offsetX = event.pageX - initialMouse.x;
    if (clicking) {
      mRef.current.style.left = offsetX + "px";
      // mRef.current.style.left = event.pageX + "px";
      // mRef.current.style.top = event.clientY;
    }
    setMousePos({ x: event.clientX, y: event.clientY });

  };

  useEffect(() => {
    initialMilestone = { left: mRef.current.style.left, top: mRef.current.style.top };

    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/");
    get(child(dbRefMilestone, m_key)).then((snapShot) => {
      if (snapShot.exists()) {
        let currComplete = snapShot.val().complete;
        setFinished(currComplete);
      }
    });




    /*
      Rest of useEffect() is still a work-in-progress
      (handling click and drag to rearrange milestones order.)
    */

    // window.addEventListener('mousemove', handleMouseMove);
    // window.addEventListener("mouseup", _handleMouseUp);
    // window.addEventListener("mousedown", _handleMouseDown);
    // if (clicking) {
    //   mRef.current.style.backgroundColor = 'blue';
    //   //   mRef.current.style.left = mousePos.x + 'px';
    // }
    // else {
    //   mRef.current.style.backgroundColor = 'red';
    // }

    // return () => {
    //   window.removeEventListener(
    //     'mousemove',
    //     handleMouseMove
    //   );
    //   window.removeEventListener(
    //     'mouseup',
    //     _handleMouseUp
    //   );
    //   window.removeEventListener(
    //     'mouseup',
    //     _handleMouseDown
    //   );
    // };

  }, [clicking, mousePos]);


  return (
    <>
      <div className={finished ? 'm_Item done ' : 'm_Item '} id='mStone' ref={mRef}
        onMouseDown={(e) => { handleMouseDown(e); }}
      // onMouseUp={ (e) => { handleMouseUp(e); } }
      >
        <div className="xBtn2" onClick={deleteItem}>
          <i className="fas fa-times xButton" />
        </div>

        <div className='m_info'>
          <h3 className='m_title'>{title}</h3>
          <p className='m_desc2'>{date}</p>
          <p className='m_desc3'>{description}</p>
          <span className='m_text'>Priority</span> <br />
          <span className='m_desc2'>
            <select name="priorities" id="priorities" className='priorities'
              value={dropdown.value}
              onChange={changeDropdown} >
                <option value="Critical"> Critical </option>
                <option value="High">     High     </option>
                <option value="Medium">   Medium   </option>
                <option value="Low">      Low      </option>
            </select>
          </span>
          <div className='center'>
          <button className='btnToggle' onClick={toggleDone}>
            {finished ? "Mark Incomlete" : "Mark Complete"}
          </button>
        </div>

        </div>
      </div>
    </>
  )
}

export default MilestoneItem;