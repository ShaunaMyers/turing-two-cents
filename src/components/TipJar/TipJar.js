import React from 'react';
import TipCard from '../TipCard/TipCard';
import './TipJar.css';
import PropTypes from 'prop-types';

const TipJar = ({ tips, handleDelete, handleRating, error }) => {
  tips.sort((a, b) => b.date - a.date)

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
  }

  const formattedTips = tips.map(tip => {
    return { ...tip, date: formatDate(parseInt(tip.date)) }
  })

  const allTips = formattedTips.map(tip => {
    return (
       <TipCard 
          rating={tip.rating}
          handleRating={handleRating}
          id={tip.id}
          key={tip.id}
          title={tip.title}
          description={tip.description}
          mod={tip.mod}
          date={tip.date}
          handleDelete={handleDelete}
          error={error}
        />
    )
  });

    return (
      <section className='tip-jar'>
        {allTips}
      </section>
    )
};

export default TipJar;

TipJar.propTypes = {
  tips: PropTypes.array,
  handleDelete: PropTypes.func,
  error: PropTypes.string
}