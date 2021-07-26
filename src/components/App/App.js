import React, { useState, useEffect } from 'react';
import { getTips } from '../../ApiCalls'


const App = () => {
  const [advice, setAdvice] = useState([]);

  
  //function to call and set the state to the apicall

  // .then(data = data => { 
  //   this.setState({advice})
  // })
  
  // const removeCard = (id) => {
  //   let filteredCards = cards.filter(card => card.id !== id);
  //   setCards(filteredCards);
  // }

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
