import React from 'react';
import { Link } from 'react-router-dom';
import back from "./back-button.png";
const imgSize = 50;
export const Navi = (props) => {
  function changePage (i) {

  }
  return (
    <div className="navContainer">
      <div className="backButton">
        {/* <a href='/'>Back</a> */}
        {/* <Link to="/">← Back</Link> */}
        <div className="backImg">
          <Link to={props.destination}>
            <img
              src={back}
              alt="back"
              backgroundColor="black"
              height={imgSize + "px"}
              width={imgSize + "px"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
