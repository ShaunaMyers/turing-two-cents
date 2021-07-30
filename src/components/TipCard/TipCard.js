import React, {useState} from 'react';
import './TipCard.css';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Tip = ({ rating, id, title, description, mod, date, handleDelete, handleRating}) => {
  
  const [message, setMessage] = useState('');
  let timer;

  const onRating = (value, id) => {
    handleRating(value, id);
    setMessage('You have successfully rated this tip')
    timer = setTimeout(() => setMessage(''), 3000)
  }

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
      <p><Rating onClick={(value) => onRating(value, id)}
      emptySymbol={<FontAwesomeIcon icon={faStar} size="2x" className='empty-star'/>}
      fullSymbol={<FontAwesomeIcon icon={faStar} size="2x" className='filled-star' />}
      placeholderSymbol={<FontAwesomeIcon icon={faStar} size="2x" className='filled-star' />}
      placeholderRating={rating}
      /></p>
      {message && <p className="message-text">{message}</p>}
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
  handleDelete: PropTypes.func,
  message: PropTypes.string
}