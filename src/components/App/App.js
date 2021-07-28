import React, { useState, useEffect } from 'react';
import { getTips, addTip } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState([]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   getTips()
  //   .then(data => setAdvice(data.rows))
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      setError('');
 
      try {
        const result = await getTips();
        setAdvice(result.rows);
      } catch (error) {
        setError('Oops, problem loading tips. Please refresh the page.');
      }
 
    };
 
    fetchData();
  }, []);

  const handleAddTip = (newTip) => {
    setAdvice([...advice, newTip])
    addTip(newTip)
  }

  const validateInputs = (title, description) => {
    if (!title || !description) {
      console.log('hi')
      setError('Please fill out title & description fields.')
    } else {
      console.log('not hi')
      setError('')
    }
  } 

  return (
    <main className='main'>
      <header><h1>Turing Tip Jar</h1></header>
      <Form handleAddTip={handleAddTip} validateInputs={validateInputs}/>
      {error === 'Please fill out title & description fields.' 
      && <Error error={error}/>}
      {!advice.length && !error ? <Loader/> : 
      <TipJar tips={ advice } />}
      {error ? <Error error={error} /> :
      <TipJar tips={ advice } />
      } 
    </main>
  )
};

export default App
