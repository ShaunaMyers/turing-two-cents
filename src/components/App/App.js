import React, { useState, useEffect } from 'react';
import { getTips, addTip, deleteTip, updateRating } from '../../ApiCalls';
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
  let timer;

  // const fetchData = async () => {
  //   setError('');
  //   try {
  //     const result = await getTips();
  //     setAdvice(result.rows);
  //   } catch (error) {
  //     setError('Oops, problem loading tips. Please refresh the page.');                      
  //   }
  // };

  const fetchData = () => {
    setError('');
    getTips()
    .then(result => setAdvice(result.rows))
    .catch(err => {
      setError('Oops, problem loading tips. Please refresh the page.')
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleAddTip = (newTip) => {
    addTip(newTip)
    .then(() => {
      fetchData()
    })
    .catch(err => {
      setError(`${err}`)
      timer = setTimeout(() => setError(''), 5000)
    })
    // if (advice.length) {
    //   setError('');
    // }
  }    

  const handleRating = (rating, id) => {
    updateRating(rating, id)
    .then(() => {
      const updatedAdvice = advice.map( (tip) => {
        if (tip.id === id) { 
          tip.rating = rating
        }
        return tip
      })
      setAdvice(updatedAdvice)
      setError('You successfully rated a card')
      timer = setTimeout(() => setError(''), 5000)
    })
    .catch(err => {
      console.log('Theres an error')
      setError(`${err}`)
      timer = setTimeout(() => setError(''), 5000)
    })
  }
  
  const validateInputs = (title, description) => {  
    if (!title || !description) {
      setError('Please fill out title & description fields.')
      timer = setTimeout(() => setError(''), 5000)
    } else {
      //do we need this??
      setError('')
    }
  } 

  const evaluateLoaderAndError = () => {
    // if (error === 'Oops, problem loading tips. Please refresh the page.') {
    //   return <Error error={error} />
    // } else 
    if (!advice.length && !error) {
       return <Loader/>
    } else {
      return <TipJar handleRating={handleRating} handleDelete={handleDelete} tips={ advice } error = {error}/>
    }
  }

  const handleDelete = (id) => {
    deleteTip(id)
    .then(() => {
      const filtered = advice.filter(tip => tip.id !== id)
      setAdvice(filtered)
    })
    .catch(err => {
      setError(`${err}`)
      timer = setTimeout(() => setError(''), 5000)
    })
    // !filtered.length &&
    //   setError('Oh no! All out of advice! Please contribute your tip to our tip jar.');
    //   timer = setTimeout(() => setError(''), 5000)
  }

  return (
    <main className='main'>
      <header className='nav-header'>
        <Link to='/'><h1>Turing Tip Jar</h1></Link>
        <NavLink to='/module/1' activeClassName='nav-button' className='mod-button'>Module 1</NavLink>
        <NavLink to='/module/2' activeClassName='nav-button' className='mod-button'>Module 2</NavLink>
        <NavLink to='/module/3' activeClassName='nav-button' className='mod-button'>Module 3</NavLink>
        <NavLink to='/module/4' activeClassName='nav-button' className='mod-button'>Module 4</NavLink>
        <NavLink exact to='/' activeClassName='nav-button' className='mod-button'>Show All</NavLink>
      </header>
      {/* {error !== 'Oops, problem loading tips. Please refresh the page.' && } */}
      {error !== 'Oops, problem loading tips. Please refresh the page.' && <Error error={error}/>}
      {error !== 'Oops, problem loading tips. Please refresh the page.'  
      ? <Switch>
          <Route exact path='/' render={() => {
            return (
              <>
              <Form handleAddTip={handleAddTip} validateInputs={validateInputs}/> 
              {evaluateLoaderAndError()}
              </>
            )
          }}/>
          <Route exact path='/module/:num' render={({match}) => {
            let selectedMod =  parseInt(match.params.num)
            let filtered = advice.filter(tip => tip.mod === selectedMod)
            // !filtered.length && setError('Oh no! All out of advice! Please contribute your tip to our tip jar.')
            // timer = setTimeout(() => setError(''), 5000)
            return (
              error !== 'Oops, problem loading tips. Please refresh the page.'  
              ? <>
                  <Form handleAddTip={handleAddTip} validateInputs={validateInputs}/> 
                  <TipJar handleRating={handleRating} handleDelete={handleDelete} tips={filtered} error={error}/>
                </>
              : <Error error={error}/>        
            )
          }}/>
          <Route path='/' render={() => 
            <Error error={'404 Not Found'} />
          }/>
        </Switch>
      : <Error error={error} />
      }
      
      {/* Do we need this either? */}
    </main>
  )
};

export default App

App.propTypes = {
  advice: PropTypes.array,
  error: PropTypes.string,
  handleDelete: PropTypes.func,
  handleRating: PropTypes.func,
  validateInputs: PropTypes.func
};