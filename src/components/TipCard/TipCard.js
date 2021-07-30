import React from 'react';
import './TipCard.css';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

const Tip = ({ rating, id, title, description, mod, date, handleDelete, handleRating}) => {
  
  return (
    <article className='tip-card'>
      <div className={`styling-box mod-${mod}`}>
      <p className="mod-text">Mod {mod}</p>
      </div>
      <h2>{title}</h2>
      <hr />
      <p className="description">{description}</p>
      <div className='rating-details'>
      <p>Your Rating:</p>
      <p><Rating onClick={(value) => handleRating(value, id)}
      // emptySymbol={<img src="assets/images/star-empty.png" className="icon" />}
      // fullSymbol={<img src="assets/images/star-full.png" className="icon" />}
      placeholderRating={rating}
      /></p>
      </div>
      <p>Date Submitted: {date}</p>
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