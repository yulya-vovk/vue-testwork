describe('UserTable', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('отображает заголовок', () => {
    cy.contains('Учетные записи').should('be.visible')
  })

  it('позволяет добавить новую учетную запись', () => {
    cy.get('[aria-label="Добавить учетную запись"]').click()

    cy.get('form').within(() => {
      cy.get('select').select('1')

      cy.get('input[placeholder="Метка (можно через ;)"]').type('GitHub;Почта')
      cy.get('input[placeholder="Логин"]').type('julia@example.com')
      cy.get('input[placeholder="Пароль"]').type('123')
      cy.get('button[type="submit"]').click()
    })

    cy.get('.users-table .user-row input[placeholder="Логин"]').last().should('have.value', 'julia@example.com')
  })

  it('позволяет удалить запись', () => {
    cy.get('[aria-label="Удалить запись"]').first().click()
    cy.get('input[placeholder="Логин"]').should('have.length', 4)
  })
})