import React, { useState, useEffect } from 'react';
import { getTips, addTip } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getTips().then(data => setAdvice(data.rows))
  }, [])

  const handleAddTip = (newTip) => {
    setAdvice([...advice, newTip])
    addTip(newTip)
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
