import React, { useState, useEffect } from 'react';
import { getTips, addTip, deleteTip } from '../../ApiCalls';
import TipJar from '../TipJar/TipJar';
import Form from '../Form/Form';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import './App.css';
import { Route, NavLink, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      return <TipJar handleDelete={handleDelete} tips={ advice } />
    }
  }

  const handleDelete = (id) => {
    const filtered = advice.filter(tip => tip.id !== id)
    setAdvice(filtered)
    deleteTip(id)
  }

  return (
    <main className='main'>
      <header className='nav-header'>
        <Link to='/'><h1>Turing Tip Jar</h1></Link>
        {/* <div> */}
          <NavLink to='/module/1' activeClassName='nav-button' className='mod-button'>Module 1</NavLink>
          <NavLink to='/module/2' activeClassName='nav-button' className='mod-button'>Module 2</NavLink>
          <NavLink to='/module/3' activeClassName='nav-button' className='mod-button'>Module 3</NavLink>
          <NavLink to='/module/4' activeClassName='nav-button' className='mod-button'>Module 4</NavLink>
          <NavLink exact to='/' activeClassName='nav-button' className='mod-button'>Show All</NavLink>
        {/* </div> */}
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
            <TipJar handleDelete={handleDelete} tips={filtered}/>
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

App.propTypes = {
  advice: PropTypes.array,
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};