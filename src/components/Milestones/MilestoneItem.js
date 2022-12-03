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

function MilestoneItem({ title, date, m_key, description, projectID, priority }) {          //Code to make page scroll to top
  // $('mStone').mouseup(function() {
  //   $('input.active').removeClass('active');
  // });
  // $('mStone').onMouseUp
  const mRef = useRef();

  const [mousePos, setMousePos] = useState({});

  const [finished, setFinished] = useState(false);
  const [clicking, setClicking] = useState(false);
  // alert(priority);
  const [dropdown, setDropdown] = useState({value: "" + priority});

  const changeDropdown = event => {
    setDropdown({value: event.target.value});

    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
    // alert("projects/" + projectID + "/milestones/" + m_key);
    update(dbRefMilestone, {
      priority: event.target.value,
      urgency: p2Num(event.target.value)
    }).then(() => {
      // alert("Data updated");
      window.location.reload();
    });
  };
  var initialMouse = {x: 0, y: 0};

  var initialMilestone = {};

  const _handleMouseUp = (event) => {
    // alert(mRef.current.style.left);
    // alert(initialMilestone.left);
    // mRef.current.style.left = initialMilestone.left;
    setClicking(false);

    // alert('up');
  }
  const _handleMouseDown = (event) => {
    initialMouse = { x: event.pageX, y: event.pageY };
    initialMilestone = { left: mRef.current.style.left, top: mRef.current.style.top };
    setClicking(true);
  }

  function deleteItem() {
      let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
      // alert("projects/" + projectID + "/milestones/" + m_key);
      remove(dbRefMilestone).then(() => {
        // alert("location removed");
        window.location.reload();
      });
      
  }
  function toggleDone() {
    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/" + m_key);
    update(dbRefMilestone, { complete: !finished }).then(() => {
      // alert("Data updated");
      setFinished(!finished);
    });


    // let dbRefMilestone = dbRef.child("projects/" + projectID + "/milestones/" + m_key);
    // mRef.update({
    //   'complete':'true'}
    // );
    // setFinished(!finished);
  }

  function handleMouseDown (event) {
    // event.stopPropogation()
    // event.preventDefault()
    // alert(event.clientX);
    setClicking(true);
    // alert('dwn');

    // alert(clicking);
  };

  function handleMouseUp (event) {
    // event.stopPropogation()
    // event.preventDefault()
    // alert("up: " + event.clientX);
    // setClicking(false);
  };
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
        onMouseDown={ (e) => { handleMouseDown(e); } }
        // onMouseUp={ (e) => { handleMouseUp(e); } }
      >
        <div className="xBtn2" onClick={deleteItem}>
          <i className="fas fa-times xButton" />
        </div>
                  {/* <figure className='cards__item__pic-wrap' data-label={props.label}> */}
                      {/* <img src={props.src} alt='Project Image' className='m_item_img' /> */}
                      {/* <Link className="card-edit" to="/EditProject" state={{key: props.projectKey}}  onClick={scrollToTop}> */}
                          {/* <i class="fas fa-bars"></i> */}
                      {/* </Link> */}
                  {/* </figure> */}
          <div className='m_info'>
            <h3 className='m_title'>{title}</h3>
            <p className='m_desc2'>{date}</p>
            <p className='m_desc2'>{description}</p>
            <span className='m_text'>Priority</span> <br />
            <span className='m_desc2'>
                              <select name="priorities" id="priorities" className='priorities'
                                value={dropdown.value}
                                onChange={changeDropdown}
                              >
                                  <option value="Critical"> Critical </option>
                                  <option value="High">     High     </option>
                                  <option value="Medium">   Medium   </option>
                                  <option value="Low">      Low      </option>
                              </select>

            
            </span>
          </div>
          <div className='center'>
            <button className='btnToggle' onClick={toggleDone}>
              {finished ? "Mark Incomlete" : "Mark Complete"}
            </button>
          </div>
        </div>
    </>
  )
}

export default MilestoneItem;