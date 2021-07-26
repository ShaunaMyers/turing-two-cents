import React from 'react';
import './TipCard.css'

const Tip = ({ id, title, description, mod, upvotes, date}) => {
  return (
    <article className='tip-card'>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{mod}</p>
      <p>{upvotes}</p>
      <p>{date}</p>
    </article>
  )
}

export default Tip;