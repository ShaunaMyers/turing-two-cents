export const getTips = () => {
  return fetch('https://turingtwocentapi.herokuapp.com/')
    .then(response => response.json())
    .catch(err => console.log(err))
}