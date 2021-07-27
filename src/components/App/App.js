import React, { useState, useEffect } from 'react';
import { getTips, addTip } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import Error from '../Error/Error';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  // useEffect(() => {
  //   getTips()
  //   .then(data => setAdvice(data.rows))
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading('Loading tips...');
 
      try {
        const result = await getTips();
 
        setAdvice(result.rows);
      } catch (error) {
        setError('Oops, problem loading tips. Please refresh the page.');
      }
 
      setLoading('');
    };
 
    fetchData();
  });

  const handleAddTip = (newTip) => {
    setAdvice([...advice, newTip])
    addTip(newTip)
  }

  return (
    <main className='main'>
      <header><h1>Turing Tip Jar</h1></header>
      <Form handleAddTip={handleAddTip}/>
      {loading ? <Loader loading={loading}/> : 
      <TipJar tips={ advice } />}
      {error ? <Error error={error} /> :
      <TipJar tips={ advice } />
      } 
    </main>
  )
};

export default App
