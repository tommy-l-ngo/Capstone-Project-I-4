import React from 'react';

function Attachments() {
  // This hero section contains the website header as well as the create project and edit projects tab
  return (
    <div className="attachments-container">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          {/* <!-- <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1" ></li>
          <li data-target="#myCarousel" data-slide-to="2" ></li> --> */}
        </ol>

        <div class="carousel-inner">

        </div>

        <a href="#myCarousel" class="left carousel-control" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a href="#myCarousel" class="right carousel-control" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Attachments;
