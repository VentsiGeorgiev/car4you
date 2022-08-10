describe('Explore page', () => {
  it('Render explore page title', () => {
    cy.visit('http://localhost:3000')
    cy.get('h1')
      .should('exist')
      .contains('Find your next car')
  })
})