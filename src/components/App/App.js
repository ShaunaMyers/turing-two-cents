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
    !title || !description ? 
    setError('Please fill out title & description fields.') :
    setError('')
  } 

  const evaluateLoaderAndError = () => {
    if (error) {
      return <Error error={error} />
    } else if (!advice.length && !error) {
       return <Loader/>
    } else {
      return <TipJar tips={ advice } />
    }

  }


  return (
    <main className='main'>
      <header>
        <Link to='/'><h1>Turing Tip Jar</h1></Link>
        <NavLink to='/module/1' className='nav-button'>Module 1</NavLink>
        <NavLink to='/module/2' className='nav-button'>Module 2</NavLink>
        <NavLink to='/module/3' className='nav-button'>Module 3</NavLink>
        <NavLink to='/module/4' className='nav-button'>Module 4</NavLink>
      </header>
      <Form handleAddTip={handleAddTip} validateInputs={validateInputs}/>
      {error === 'Please fill out title & description fields.' 
      && <Error error={error}/>}
      <Switch>
        <Route exact path='/' render={() => {
          return (
            evaluateLoaderAndError()
          )
        }}/>
        <Route exact path='/module/:num' render={({match}) => {
          let selectedMod =  parseInt(match.params.num)
          let filtered = advice.filter(tip => tip.mod === selectedMod)
          return (
            <TipJar tips={filtered}/>
          )
        }}/>
        <Route path='/' render={() => 
          <Error error={'404 Not Found'} />
        }/>
        {/* {
      {error ? <Error error={error} /> :
      <TipJar tips={ advice } />
      }  */} 
      </Switch>
    </main>
  )
};

export default App
