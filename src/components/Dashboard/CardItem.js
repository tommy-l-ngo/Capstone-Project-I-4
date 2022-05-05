import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

  return (
    <>
        <li className='cards__item'>
            <Link className='cards__item__link' to={props.path} onClick={scrollToTop}>
                <figure className='cards__item__pic-wrap' data-label={props.label}>
                    <img src={props.src} alt='Project Image' className='cards__item__img' />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.text}</h5>
                    <p className='cards__item__desc'>{props.desc}</p>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItem;