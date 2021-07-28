import React from 'react';
import './TipCard.css'

const Tip = ({ id, title, description, mod, rating, date}) => {
  return (
    <article className='tip-card'>
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <p>{mod}</p>
      <p>{rating}</p>
      <p>{date}</p>
    </article>
  )
}

export default Tip;