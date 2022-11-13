import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { getDatabase, get, child, ref, set, push, remove, update } from "firebase/database";

import "./Milestones.css";
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  
function MilestoneItem({ title, date, m_key, description, projectID }) {          //Code to make page scroll to top
  const [finished, setFinished] = useState(false);
  function deleteItem() {
        // alert("hellow");
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
    // const mRefs = dbRef.child("projects/" + projectID + "/milestones/");
    // const mRef = mRef.child(m_key);
    // alert('mRefs');

    // let dbRefMilestone = dbRef.child("projects/" + projectID + "/milestones/" + m_key);
    // mRef.update({
    //   'complete':'true'}
    // );
    // setFinished(!finished);
  }

  useEffect(() => {
    let dbRefMilestone = ref(db, "projects/" + projectID + "/milestones/");
    get(child(dbRefMilestone, m_key)).then((snapShot) => {
      if (snapShot.exists()) {
        let currComplete = snapShot.val().complete;
        setFinished(currComplete);
      }
    });
  });
  
    // props.path - Path to redirect to
    // props.label - Subtext
    // props.src - image for project
    // props.text - Project title
    // props.desc - project description
  return (
      <>
      {/* <div className="xBtn2"
        // onClick={deleteItem()}
      > */}
        {/* <i className="fas fa-times xButton" /> */}
        

      <div className={finished ? 'm_Item done' : 'm_Item'}>
      <div className="xBtn2" onClick={deleteItem}>
          <i className="fas fa-times xButton" />
      {/* </div> */}
        </div>
                {/* <figure className='cards__item__pic-wrap' data-label={props.label}> */}
                    {/* <img src={props.src} alt='Project Image' className='m_item_img' /> */}
                    {/* <Link className="card-edit" to="/EditProject" state={{key: props.projectKey}}  onClick={scrollToTop}> */}
                        {/* <i class="fas fa-bars"></i> */}
                    {/* </Link> */}
                {/* </figure> */}
        <div className='m_info'>
          {/* {projectID} */}
                  <h5 className='m_text'>{title}</h5>
                    <p className='m_desc'>{date}</p>
                    <p className='m_desc'>{description}</p>
        </div>
        <div className='center'>
          <button className='btnToggle' onClick={toggleDone}>{finished ? "Mark Incomlete" : "Mark Complete" }</button>

        </div>
        </div>
    </>
  )
}

export default MilestoneItem;