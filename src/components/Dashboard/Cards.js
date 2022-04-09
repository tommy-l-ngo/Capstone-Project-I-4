import React from 'react'
import CardItem from './CardItem';
import './Cards.css';
import data from "./data"

function Cards() {
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;