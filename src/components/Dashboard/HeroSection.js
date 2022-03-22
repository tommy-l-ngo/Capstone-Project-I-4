import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
        <h1>Ph.D. Scheduler Mock Dashboard</h1>
        <p>WORK IN PROGRESS</p>
        <div className="hero-btns">
            <Button
                page='create_project'
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
            >
                Create Project
            </Button>
            <Button
                page='edit_project'
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