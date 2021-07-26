import React, { useState, useEffect } from 'react';
import { getTips } from '../../ApiCalls'


const App = () => {
  const [advice, setAdvice] = useState([]);

  
  //function to call and set the state to the apicall

  

  useEffect(() => {
    console.log('this is test toseee useeffect method');
    getTips()
  }, [])

  return (
    <main className='main'>
      {/* <TipJar /> */}
      <h1>HI WE EXIST</h1>
    </main>
  )

};

export default App