describe('Explore page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Render explore page title', () => {
    cy.get('h1')
      .should('exist')
      .contains('Find your next car')
  })

  it('Rent categorie is correct', () => {
    cy.get('h2').eq(0).contains("Rent a car")
  })

  it('Sale categorie is correct', () => {
    cy.get('h2').eq(1).contains("Buy a car")
  })
})