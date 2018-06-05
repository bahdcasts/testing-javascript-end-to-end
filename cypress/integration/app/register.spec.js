const faker = require('faker')

describe('The registration process', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:5678');
    cy.get('[href="/auth/register"]').click();

    const fakeUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    cy.get('input[name="name"]').type(fakeUser.name);
    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('input[name="password"]').type(fakeUser.password);
    cy.get('input[name="confirmPassword"]').type(fakeUser.password);

    cy.get('.btn').click();
    cy.url().should('equal', 'http://localhost:5678/');
    cy.get('span > .mr-2').should('have.text', 'Create recipe');
  });
});