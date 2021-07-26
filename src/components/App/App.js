import React, { useState, useEffect } from 'react';
import { getTips } from '../../ApiCalls'
import TipJar from '../TipJar/TipJar'
import Form from '../Form/Form'


const App = () => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getTips().then(data => setAdvice(data.rows))
  }, [])

  return (
    <main className='main'>
      <header><h1>HI WE EXIST</h1></header>
      <Form />
      <TipJar tips={ advice } />
    </main>
  )
};

export default App
