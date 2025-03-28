import React from 'react';
import arrow from '../../assets/my-space-arrow.svg';
import './MySpaceCard.css';
import { Link } from 'react-router';

interface Card {
  title: string;
  backgroundColor: string;
  image: string;
  description: string;
  link: string;
}

interface Props {
  card: Card;
}

const MySpaceCard: React.FC<Props> = ({ card }) => {
  return (
    <div className='my-space-card'>
      <h1 className='my-space-card__title'>{card.title}</h1>
      <div
        className='my-space-card__content'
        style={{ backgroundColor: card.backgroundColor }}
      >
        <img className='my-space-card__image' src={card.image} alt='' />
        <Link to={card?.link}>
          <div className='my-space-card__arrow-container'>
            <img className='my-space-card__arrow' src={arrow} alt='' />
          </div>
        </Link>
      </div>
      <p className='my-space-card__description'>{card.description}</p>
    </div>
  );
};

export default MySpaceCard;
