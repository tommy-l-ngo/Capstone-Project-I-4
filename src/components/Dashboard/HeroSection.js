import React from "react";
import "./Dashboard.css";
import { Button } from "./Button";
import "./HeroSection.css";
import "./Navbar";

function HeroSection() {
  // This hero section contains the website header as well as the create project and edit projects tab
  return (
    <div className="hero-container">
      <h1>Ph.D. Student Scheduler</h1>
      <p>Create a Project</p>
      <div className="hero-btns">
        <Button
          page="CreateProject"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Create Project
        </Button>
        <Button
          page="EditProject"
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Edit Projects
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
