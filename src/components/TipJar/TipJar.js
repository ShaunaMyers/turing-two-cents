import { description } from 'commander';
import React from 'react';
import TipCard from '../TipCard/TipCard'
import './TipJar.css';

const TipJar = ({ tips, handleDelete }) => {

  const miliSecTips = tips.map(tip => { 
    return { ...tip, date: Date.parse(tip.date) }
  }).sort((a, b) => b.date - a.date)
  // const sortedMiliTips = miliSecTips.sort((a, b) => b.date - a.date);

  const sortedTips = miliSecTips.map(tip => {
    return { ...tip, date: new Date(tip.date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) }
  })

  const allTips = sortedTips.map(tip => {
    return (
      <TipCard 
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