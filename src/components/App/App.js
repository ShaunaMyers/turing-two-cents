import React, { useState } from 'react';

const App = () => {
  const [advice, setAdvice] = useState([]);

  return (
    <main className='main'>
      <TipJar />
    </main>
  )
};