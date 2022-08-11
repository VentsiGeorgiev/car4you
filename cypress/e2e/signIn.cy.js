describe('User Sign In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in')
  })

  it('Allows users to sign in correctly', () => {
    cy.get('#email')
      .type('test@test.com')
    cy.get('#password')
      .type('test123')
    cy.get("[data-test='singInBtn']")
      .click().wait(2000)

    cy.get('.Header_header__content__nav__5NdGV > ul > :nth-child(3) > a').click()

    cy.get('#name')
      .should('exist')

  })
})