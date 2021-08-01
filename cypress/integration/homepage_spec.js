describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('tipCards.json').then((tipCardData) => {
      cy.intercept('https://turingtwocentapi.herokuapp.com/', tipCardData)
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should be able to visit http://localhost:3000 and see a title rendered', () => {
    cy
      .get('.nav-header')
      .contains('Turing Tip Jar')
  })

  it('Should be able to visit http://localhost:3000 and see a form rendered', () => {
    cy
      .get('form')
      .should('be.visible')
  })

  it('Should be able to click on a module button and see only cards pertaining to that module', () => {
    cy
      .get('[href="/module/1"]')
      .click()
      .get('h2')
      .contains('How to Duke')
  })
  
  it('Should be able to click on Show All and see all the cards', () => { 
    cy
      .get('[href="/module/1"]')
      .click()
      .get('.nav-header > :nth-child(6)')
      .click()
      .get('.tip-jar')
      .children('.tip-card')
      .should('have.length', 3)
  })

  it('Should be able to click on the header title and return home', () => { 
    cy
      .get('[href="/module/1"]')
      .click()
      .get('h1')
      .click()
      .url()
      .should('eq','http://localhost:3000/')
  })

  it('Should be able to click Back Button after clicking Module 1 to return to Home Page', () => {
    cy
      .get('[href="/module/1"]')
      .click()
      .url()
      .should('eq','http://localhost:3000/module/1')
      .go('back')
      .url()
      .should('eq','http://localhost:3000/')
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

  it('Should be able to select a module from the drop down menu', () => {
    cy
      .get('select')
      .select('4')
      .should('have.value', '4')
  })
  

  it('Should be able fill out form, click submit, and populate card container with card', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('Text for title')
      .get('[placeholder="Description"]')
      .type('Text for Description')
      .get('select')
      .select('2')

    cy
      .intercept('POST', 'https://turingtwocentapi.herokuapp.com/', {
        statusCode: 201,
        body: {
          title: 'Text for title',
          description: 'Text for description',
          mod: 2,
          rating: 0,
          date: 1627599413278
        },
      })

    cy
      .fixture('postedTipCard.json').then((tipCardData) => {
    cy
      .intercept('https://turingtwocentapi.herokuapp.com/', tipCardData)
      })
    cy
      .visit('http://localhost:3000/')
      .get('.new-tip-button')
      .click()
      .get('.tip-card')
      .should('have.length', '4')
  })

  it.only('Should be able to see a message when a tip card has been added to the page', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('Text for title')
      .get('[placeholder="Description"]')
      .type('Text for Description')
      .get('select')
      .select('2')
      .get('.new-tip-button')
      .click()
      .get('p')
      .contains('You have successfully submitted a tip card')
  })

  it('Should show an error message if all inputs are not filled out', () => {
    cy
      .get('.new-tip-button')
      .click()
      .get(':nth-child(3) > p')
      .contains('Please fill out title & description fields.')
  })

  it('Should show an error message if title input is longer than 50 characters', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('This is a really long title and I have a lot to say but I probably should have placed this in the description and not in the title but when you have this much to say you cannot be contained. No one dictates what I do! I run my own life!')
      .get('[placeholder="Description"]')
      .type('Text for description')
      .get('.new-tip-button')
      .click()
      .get('p')
      .contains('Title is too long. Only 50 characters allowed.')
  })

  it('Should show an error message if description input is longer than 500 characters', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('Text for title')
      .get('[placeholder="Description"]')
      .type('This is a really long title and I have a lot to say but I probably should have placed this in the description and not in the title but when you have this much to say you cannot be contained. No one dictates what I do! I run my own life! And now I have even more to say because I took a deep breath and thought about my life and there is so much I want to share but I just need to take a drink of water first...then let me continue. Is this 500 characters yet? Let me check. Yeah, I guess it is 500 now.')
      .get('select')
      .select('4')
      .get('.new-tip-button')
      .click()
      .get('p')
      .contains('Description is too long. Only 500 characters allowed')
  })

  it('Should not add card if only one input is filled out', () => {
    cy
      .get('[placeholder="Tip Title"]')
      .type('Text for title')
      .get('.new-tip-button')
      .click()
      .get('.tip-jar')
      .children('.tip-card')
      .should('have.length', 3)
  })

  it('Should be able to enter a unique url with module number in path and should render specific tips for that module', () => {
    cy
      .visit('http://localhost:3000/module/1')
      .get('.tip-jar')
      .children('.tip-card')
      .contains('How to Duke')
  })

  it('Should be able to see an error message when typing in a url that is not valid', () => {
    cy
      .visit('http://localhost:3000/999')
      .get('p')
      .contains('404 Not Found')
  })

  it('Should be able to see a message when you rate a tip', () => {
    cy
      .get('.tip-jar > :nth-child(2)')
      .get(':nth-child(2) > .rating-details > :nth-child(2) > [style="display: inline-block; direction: ltr;"] > :nth-child(4) > :nth-child(1) > .svg-inline--fa > path')
      .click()
      .get('p')
      .contains('You have successfully rated this tip')
  })

  it('Should be able to see different colored stars after to rate a tip', () => {
    cy
      .get('.tip-jar > :nth-child(2)')
      .get(':nth-child(2) > .rating-details > :nth-child(2) > [style="display: inline-block; direction: ltr;"] > :nth-child(4) > :nth-child(1) > .svg-inline--fa > path')
      .click()
      .get(':nth-child(4) > [style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"] > .svg-inline--fa')
      .should('have.class', 'filled-star')
      .should('have.css', 'color', 'rgb(96, 242, 252)')
  })

  it('Should be able to press delete button for a specific card and no longer see that card on the screen', () => {
    cy
      .get(':nth-child(2) > .delete')
      .click()
      .get('.tip-jar')
      .should('not.have.value', 'Play Etiquette')
  }) 

  it('Should be able to delete all cards and see a message to add a tip card', () => {
    cy
      .get(':nth-child(1) > .delete')
      .click()
      .get(':nth-child(1) > .delete')
      .click()
      .get(':nth-child(1) > .delete')
      .click()
      .get('p')
      .contains('Oh no! All out of advice! Please contribute your tip to our tip jar.')
  })

})