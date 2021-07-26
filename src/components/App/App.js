import React, { useState, useEffect } from 'react';
import { getTips } from '../../ApiCalls'


const App = () => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getTips().then(data => setAdvice(data))
  }, [])

  return (
    <main className='main'>
      {/* <TipJar /> */}
      <h1>HI WE EXIST</h1>
    </main>
  )
};

export default App
