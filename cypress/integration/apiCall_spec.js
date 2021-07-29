describe('ApiCall errors', () => {
  it('Should display error message for 400 status code', () => {
    cy
      .intercept('https://turingtwocentapi.herokuapp.com/', {statusCode: 400})
      .visit('http://localhost:3000/')
      .contains('Oops, problem loading tips. Please refresh the page.')
  })
  it('Should display error message for 500 status code', () => {
    cy
      .intercept('https://turingtwocentapi.herokuapp.com/', {statusCode: 500})
      .visit('http://localhost:3000/')
      .contains('Oops, problem loading tips. Please refresh the page.')
  })
})