export const getTips = () => {
  return fetch('https://turingtwocentapi.herokuapp.com/')
    .then(response => {
      if (!response.ok) {
        throw Error('Oops, problem loading tips. Please refresh the page.')
      }
      return response.json()
    })
};

export const addTip = (newTip) => {
  return fetch('https://turingtwocentapi.herokuapp.com/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newTip)
  })
  .then(response => {
    if (!response.ok) {
      throw Error('Your new tip was not added, please try again')
    }
  })
};

export const deleteTip = (id) => {
  return fetch('https://turingtwocentapi.herokuapp.com/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({id})
  })
  .then(response => {
    if (!response.ok) {
      throw Error('Your delete request was not successful')
    }
  })
};

export const updateRating = (rating, id) => {
  return fetch('https://turingtwocentapi.herokuapp.com/', {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({rating, id})
  })
  .then(response => {
    if (!response.ok) {
      throw Error('Your rating was not successful')
    }
  })
};