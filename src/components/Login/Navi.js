import React from 'react';
import { Link } from 'react-router-dom';
import back from "./back-button.png";
const imgSize = 50;
export const Navi = () => {
  return (
    <div className="navContainer">
      <div className="backButton">
        {/* <a href='/'>Back</a> */}
        {/* <Link to="/">← Back</Link> */}
          <div className="backImg">

        <Link to="/">
          <img src={back} alt="back" backgroundColor="black" height={imgSize + "px"} width={imgSize + "px"}/>

        </Link>
        </div>

      </div>
    </div>
  );
}
