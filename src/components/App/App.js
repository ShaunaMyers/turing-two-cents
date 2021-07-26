import React, { useState, useEffect } from 'react';
import { getTips, addTip } from '../../ApiCalls'
import TipJar from '../TipJar/TipJar'
import Form from '../Form/Form'


const App = () => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getTips().then(data => setAdvice(data.rows))
  }, [])
//when we submit new adviceTip, need to assign a new ID through api database
//when post is sent to api Database, it'll assign an unique id
//once posted into the api, we need to do a PATCH to update only that part of the [...this.state]
//get request for only the ID of the newly created adviceTip 
//previousState

  const handleAddTip = (newTip) => {
    setAdvice([...advice, newTip])
    addTip(newTip)
  }

  return (
    <main className='main'>
      <header><h1>HI WE EXIST</h1></header>
      <Form handleAddTip={handleAddTip}/>
      <TipJar tips={ advice } />
    </main>
  )
};

export default App
