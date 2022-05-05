import React, { useState, useEffect } from "react";
import CardItem from './CardItem';
import './Cards.css';
import data from "./data"

function Cards() {
    // This maps out all of the projects pertaining to the user
  return (
        <div className='cards'>
            <h1>Current Projects</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        {data.cardData.map((item, index)=>{
                            return(
                                <CardItem 
                                key={index} 
                                src={item.src} 
                                text={item.text} 
                                desc={item.desc} 
                                label={item.label} 
                                path={`/Projects/${item.id}`}
                                />
                            )
                        })}
                        {/*{cards.length === 0 ? (
                            <h3>No current projects!</h3>
                            ) : (
                            cards.map(
                            ({
                            id,
                            projectName,
                            date,
                            description,
                            tasks,
                            user_id,
                        }) => (
                            <CardItem 
                            key={id} 
                            src="images/img-1.png"
                            text={projectName} 
                            desc={description} 
                            label="CSCE 1030"
                            path={`/Projects/${id}`}
                            />
                        )
                        )
                        )}*/}
                    </ul>
                </div>
            </div>
        </div>
    )
}
/*

                        
*/
export default Cards;