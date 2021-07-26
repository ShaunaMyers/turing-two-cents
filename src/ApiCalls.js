export const getTips = async () => {
  const url = 'https://turingtwocentapi.herokuapp.com/'
  // setError('')

  try {
    const response = await fetch(url)
    const tips = await response.json()
    // setPets(tips)
    console.log(tips, "<<<L>> tips inside apicalls")
  } catch(error) {
    // setError(error.message)
  }
}