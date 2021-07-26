import React, { useState, useEffect } from 'react';
import { getTips } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getTips().then(data => setAdvice(data.rows))
  }, [])

  const handleAddTip = (newAdvice) => {
    setAdvice([...advice, newAdvice])
  }

  return (
    <main className='main'>
      <header><h1>Turing Tip Jar</h1></header>
      <Form handleAddTip={handleAddTip}/>
      <TipJar tips={ advice } />
    </main>
  )
};

export default App
