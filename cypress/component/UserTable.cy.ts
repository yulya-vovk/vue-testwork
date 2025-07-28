//import UserTable from '@/components/UserTable.vue'
import { mount } from 'cypress/vue'

describe('UserTable E2E Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('должен отображать заголовок и существующие записи', () => {
    cy.contains('Учетные записи').should('be.visible')
    cy.get('input[placeholder="Метка"]').should('have.length.at.least', 5)
    cy.get('input[placeholder="Логин"]').should('have.length.at.least', 5)
  })

  it('должен позволять добавить новую учетную запись', () => {
    cy.get('[aria-label="Добавить учетную запись"]').click()

    cy.get('input[value="julia@example.com"]').should('exist')
     cy.get('input[placeholder="Метка (можно через ;)"]').type('GitHub;Почта')
     cy.get('input[placeholder="Логин"]').last().type('julia@example.com')
     cy.get('input[placeholder="Пароль"]').type('123')

     cy.get('button[type="submit"]').click()

     cy.get('input[value="julia@example.com"]').should('exist')
  })

  it('должен позволять редактировать метку', () => {
    const firstLabelInput = cy.get('input[placeholder="Метка"]').first()

    firstLabelInput.clear().type('Новая метка;Тест')
    firstLabelInput.blur()

    firstLabelInput.should('have.value', 'Новая метка;Тест')
  })

  it('должен позволять переключать видимость пароля', () => {
    cy.get('button[aria-label="Показать пароль"]').first().click()

    cy.get('button[aria-label="Скрыть пароль"]').should('exist').first()

    cy.get('button[aria-label="Скрыть пароль"]').first().click()
    cy.get('button[aria-label="Показать пароль"]').should('exist').first()
  })

  it('должен позволять удалить учетную запись', () => {
    cy.get('button[aria-label="Удалить запись"]').then($buttons => {
      const initialCount = $buttons.length

      cy.get('button[aria-label="Удалить запись"]').first().click()

      cy.get('button[aria-label="Удалить запись"]').should('have.length', initialCount - 1)
    })
  })

  it('должен валидировать обязательные поля при добавлении', () => {
    cy.get('[aria-label="Добавить учетную запись"]').click()

    cy.get('input[placeholder="Метка (можно через ;)"]').type('Тест')
    cy.get('input[placeholder="Пароль"]').type('123')
    cy.get('button[type="submit"]').click()

    cy.get('input[placeholder="Логин"]').should('have.class', 'input-error')
  })
})