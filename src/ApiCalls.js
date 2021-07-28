export const getTips = () => {
  return fetch('https://turingtwocentapi.herokuapp.com/')
    .then(response => response.json())
    .catch(err => console.log(err))
};

export const addTip = (newTip) => {
  return fetch('https://turingtwocentapi.herokuapp.com/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newTip)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
};

export const deleteTip = (id) => {
  return fetch('https://turingtwocentapi.herokuapp.com/', {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(id)
  })
  .then(response => response.json())
  // .then(response => console.log(response,' : response in fetch call'))
  .catch(err => console.log(err))
};