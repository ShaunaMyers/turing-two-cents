import { description } from 'commander';
import React from 'react';
import TipCard from '../TipCard/TipCard'
import './TipJar.css';

const TipJar = ({ tips }) => {
  console.log(tips,' :tips inside tipjar.jcs <<<<<')
  const allTips = tips.map(tip => {
    return (
      <TipCard 
        id={tip.id}
        title={tip.title}
        description={tip.description}
        mod={tip.mod}
        upvotes={tip.upvotes}
        date={tip.date}
        key={tip.id}
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