import React from 'react'
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
        <div className='cards'>
            <h1>Current Projects</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                        src="images/img-1.png"
                        text="Test Project 1"
                        desc="This is Project 1. This is a test paragraph for the project."
                        label="CSCE 4901"
                        path='/project1'
                        />

                        <CardItem 
                        src="images/img-2.png"
                        text="Test Project 2"
                        desc="This is Project 2. This is a test paragraph for the project."
                        label="CSCE 1030"
                        path='/project2'
                        />

                        <CardItem 
                        src="images/img-3.png"
                        text="Test Project 3"
                        desc="This is Project 1. This is a test paragraph for the project."
                        label="CSCE 2610"
                        path='/project3'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;