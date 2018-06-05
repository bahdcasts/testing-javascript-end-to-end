describe('The home page test', () => {
  it('should have the login and sign up buttons', () => {
    cy.visit('http://localhost:5678');
    cy.get('span > .mr-2').should('have.text', 'Sign in');
    cy.get('[href="/auth/register"]').should('have.text', 'Join now');
  });
});
