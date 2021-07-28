import React from 'react';
import './TipCard.css';
import PropTypes from 'prop-types';

const Tip = ({ id, title, description, mod, rating, date, handleDelete}) => {
  return (
    <article className='tip-card'>
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <p>{mod}</p>
      <p>{rating}</p>
      <p>{date}</p>
      <button onClick={(e) => {handleDelete(id)}} className='delete'>Delete</button>
    </article>
  )
}

export default Tip;

Tip.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  mod: PropTypes.number,
  rating: PropTypes.number,
  date: PropTypes.string,
  handleDelete: PropTypes.func
}