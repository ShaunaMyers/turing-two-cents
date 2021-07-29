describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('tipCards.json').then((tipCardData) => {
      cy.intercept('https://turingtwocentapi.herokuapp.com/', tipCardData)
    })
    cy.visit('http://localhost:3000/')
  })
})