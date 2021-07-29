import React from 'react';
import TipCard from '../TipCard/TipCard';
import './TipJar.css';
import PropTypes from 'prop-types';

const TipJar = ({ tips, handleDelete, handleRating }) => {

  const miliSecTips = tips.map(tip => { 
    return { ...tip, date: Date.parse(tip.date) }
  }).sort((a, b) => b.date - a.date)

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
  }

  const sortedTips = miliSecTips.map(tip => {
    return { ...tip, date: formatDate(tip.date) }
  })

  const allTips = sortedTips.map(tip => {
    return (
      <TipCard 
        rating={tip.rating}
        handleRating={handleRating}
        id={tip.id}
        key={tip.id}
        title={tip.title}
        description={tip.description}
        mod={tip.mod}
        rating={tip.rating}
        date={tip.date}
        handleDelete={handleDelete}
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
  handleDelete: PropTypes.func
}