import { description } from 'commander';
import React from 'react';
import TipCard from '../TipCard/TipCard'
import './TipJar.css';

const TipJar = ({ tips }) => {
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