import React, { useState, useEffect } from 'react';
import { getTips, addTip } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import './App.css';
import { Route, NavLink, Switch, Link } from 'react-router-dom';

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

  // const validateInputValues = (title, description) => {
  //   if (!title && !description) {
  //     setError('Please fill out title & description fields.')
  //   } else {
  //     setError('')
  //   }
  // } 

  return (
    <main className='main'>
      <header>
        <Link to='/'><h1>Turing Tip Jar</h1></Link>
        <NavLink to='/module/1' className='nav-button'>Module 1</NavLink>
        <NavLink to='/module/2' className='nav-button'>Module 2</NavLink>
        <NavLink to='/module/3' className='nav-button'>Module 3</NavLink>
        <NavLink to='/module/4' className='nav-button'>Module 4</NavLink>
      </header>
      <Form handleAddTip={handleAddTip}/>
      <Switch>
        <Route exact path='/' render={() => {
          return (
            !advice.length && !error ? <Loader/> : 
            <TipJar tips={ advice } />
          )
          
        }}/>
        {/* <Route exact path='/' render={() => {
          
        }}/>
        
      {error ? <Error error={error} /> :
      <TipJar tips={ advice } />
      }  */}



      </Switch>
    </main>
  )
};

export default App
