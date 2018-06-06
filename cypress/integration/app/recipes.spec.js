const faker = require('faker')

const generateFakeRecipe = () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(4),
  timeToCook: faker.random.number(),
  ingredients: [faker.lorem.sentence(), faker.lorem.sentence()],
  procedure: [faker.lorem.sentence(), faker.lorem.sentence()],  
})

describe('The recipe creation process', () => {
  let fakeUser
  beforeEach(() => {
    fakeUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    cy.request('POST', 'http://localhost:5678/api/v1/users/signup', fakeUser).then(response => {
      cy.window().then(window => {
        window.localStorage.setItem('authUser', JSON.stringify(response.body))
      })
    })
  });

  it('should create a recipe for the user', () => {
    // arrange.
    const fakeRecipe = generateFakeRecipe()

    // provide authenticated user

    cy.visit('http://localhost:5678');
  
    //action 
    cy.contains('Create recipe').click()

    cy.get('[data-testid=recipeTitle]').type(fakeRecipe.title)
    cy.get('[data-testid=recipeTimeToCook]').type(fakeRecipe.timeToCook)
    cy.get('[data-testid=recipeDescription]').type(fakeRecipe.description)

    cy.get('.card-body > :nth-child(8)').click()
    cy.get(':nth-child(12)').click()
    cy.get('[data-testid=recipeIngredient-0]').type(fakeRecipe.ingredients[0])
    cy.get('[data-testid=recipeIngredient-1]').type(fakeRecipe.ingredients[1])    
    cy.get('[data-testid=recipeProcedure-0]').type(fakeRecipe.procedure[0])
    cy.get('[data-testid=recipeProcedure-1]').type(fakeRecipe.procedure[1])  
    
    cy.get('[data-testid=recipePublish]').click()
    


    // put in data into form

    // assertion step

    cy.url().should('contain', 'recipe')
    cy.contains(fakeRecipe.title)
    cy.contains(fakeRecipe.description)
    cy.contains(fakeRecipe.timeToCook)
    cy.contains(fakeRecipe.ingredients[0])
    cy.contains(fakeRecipe.ingredients[1])    
    cy.contains(fakeRecipe.procedure[0])
    cy.contains(fakeRecipe.procedure[1])    
    

    // assert url has changed
    // assert we see recipe details.
  })
})