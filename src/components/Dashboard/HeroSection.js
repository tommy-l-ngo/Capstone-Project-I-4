import React from 'react';
import './Dashboard.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
        <h1>Ph.D. Scheduler Mock Dashboard</h1>
        <p>WORK IN PROGRESS</p>
        <div className="hero-btns">
            <Button
                page='CreateProject'
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
            >
                Create Project
            </Button>
            <Button
                page='EditProject'
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
            >
                Edit Projects
            </Button>
        </div>
    </div>
  )
}

export default HeroSection;