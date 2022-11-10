import React from 'react';
import { Link } from 'react-router-dom';
import "./Milestones.css";

function MilestoneItem({ title, date }) {          //Code to make page scroll to top
    
    function deleteItem() {
        alert("hellow");
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
        
    }

    // props.path - Path to redirect to
    // props.label - Subtext
    // props.src - image for project
    // props.text - Project title
    // props.desc - project description
  return (
      <>
                  <div className="xBtn" onClick={deleteItem}>
          <i className="fas fa-times xButton" />
        </div>
        <div className='m_Item'>
                {/* <figure className='cards__item__pic-wrap' data-label={props.label}> */}
                    {/* <img src={props.src} alt='Project Image' className='m_item_img' /> */}
                    {/* <Link className="card-edit" to="/EditProject" state={{key: props.projectKey}}  onClick={scrollToTop}> */}
                        {/* <i class="fas fa-bars"></i> */}
                    {/* </Link> */}
                {/* </figure> */}
                <div className='m_info'>
                  <h5 className='m_text'>{title}</h5>
                    <p className='m_desc'>{date}</p>
                </div>
        </div>
    </>
  )
}

export default MilestoneItem;