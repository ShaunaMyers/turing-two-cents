import React, { useState } from 'react';
import { getTips } from '../../ApiCalls'


const App = () => {
  const [advice, setAdvice] = useState([]);

  
  //function to call and set the state to the apicall

  

  useEffect(() => {
    getTips()
  }, [])

  return (
    <main className='main'>
      {/* <TipJar /> */}
    </main>
  )

};

export default App