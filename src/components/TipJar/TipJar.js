import { description } from 'commander';
import React from 'react';
import TipCard from '../TipCard/TipCard'
import './TipJar.css';

const TipJar = ({ tips, handleDelete }) => {
  const allTips = tips.map(tip => {
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