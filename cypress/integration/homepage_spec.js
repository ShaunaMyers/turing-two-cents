describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('tipCards.json').then((tipCardData) => {
      cy.intercept('https://turingtwocentapi.herokuapp.com/', tipCardData)
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should be able to visit http://localhost:3000 and see a header rendered', () => {
    cy
      .get('.nav-header')
      .contains('Turing Tip Jar')
  })

  it('Should be able to visit http://localhost:3000 and see a form rendered', () => {
    cy
      .get('form')
      .should('be.visible')
  })

  it('Should be able to type a title into the form input title field', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('Text for title')
      .should('have.value', 'Text for title');
  
  })

  it('Should be able to type a description into the form input description field', () => {
    cy
      .get('[placeholder="Description"]')
      .type('Text for description')
      .should('have.value', 'Text for description');
  
  })

  it.only('Should be able to select a module from the drop down menu', () => {
    cy
      .get('select')
      .select('4')
      .should('have.value', '4')
  
  })
  

  it('Should be able fill out form and populate card container with card', () => {
    cy.get('[placeholder="Tip Title"]').type('Text for title')
    cy.get('[placeholder="Description"]').type('Text for Description')
    cy.get('select').select('2')
    cy.get('.new-tip-button').click()
    cy.get(':nth-child(4) > .details > :nth-child(1)').contains('2')
  })

  it('Should not populate cards if all inputs are not filled out', () => {
    cy
      .get('.new-tip-button').click()
    cy.get(':nth-child(3) > p').contains('Please fill out title & description fields.')
  })

  it('Should not add card if only one input is filled out', () => {
    cy.get('[placeholder="Tip Title"]').type('Text for title')
    cy.get('.new-tip-button').click()
    cy.get(':nth-child(3) > p').contains('Please fill out title & description fields.')
  })


  it('Should be able to click on Module 1 and see only cards pertaining to Module 1', () => {
    cy.get('[href="/module/1"]').click()
    cy.get('h2').contains('How to Duke')
  })

  it('Should be able to click Back Button after clicking Module 1 to return to Home Page', () => {
    cy.get('[href="/module/1"]').click()
    cy.url().should('eq','http://localhost:3000/module/1')
    cy.go('back')
    cy.url().should('eq','http://localhost:3000/')
  })

  it('Should be able to click on Show All and see all the cards', () => { 
    cy.get('[href="/module/1"]').click()
    cy.get('.nav-header > :nth-child(6)').click()
    cy.get('.tip-jar')
      .children('.tip-card')
      .should('have.length', 3)
  })
})