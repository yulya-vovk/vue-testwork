import { render, screen, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import UserTable from '../UserTable.vue'

vi.mock('@heroicons/vue/outline', () => ({
  PlusIcon: { template: '<span aria-hidden="true">+</span>' },
  TrashIcon: { template: '<span aria-hidden="true">🗑</span>' },
  EyeIcon: { 
    template: '<button aria-label="Показать пароль"><svg><path /></svg></button>'
  },
  EyeOffIcon: { 
    template: '<button aria-label="Скрыть пароль"><svg><path /></svg></button>'
  }
}))

vi.mock('*.svg', () => ({ template: '<span aria-hidden="true">svg</span>' }))

describe('UserTable.vue', () => {
  beforeEach(() => {

    const pinia = createPinia()
    setActivePinia(pinia)
  })

  test('рендерит заголовок и существующие записи', async () => {
    await render(UserTable)

    expect(screen.getByText(/учетные записи/i)).toBeInTheDocument()
    const logins = screen.getAllByDisplayValue('Значение')
    expect(logins).toHaveLength(5)
  })

  test('позволяет добавить новую учетную запись', async () => {
    await render(UserTable)

    const addButton = screen.getByRole('button', { name: /добавить/i })
    await fireEvent.click(addButton)

    const formInputs = screen.getAllByPlaceholderText('Логин')
    const loginInput = formInputs[formInputs.length - 1]

    const labelInput = screen.getByPlaceholderText('Метка (можно через ;)')

    const formPasswordInputs = screen.getAllByPlaceholderText('Пароль')
    const passwordInput = formPasswordInputs[formPasswordInputs.length - 1]
    const submitButton = screen.getByRole('button', { name: /добавить/i })

    await fireEvent.update(labelInput, 'GitHub;Почта')
    await fireEvent.update(loginInput, 'julia@example.com')
    await fireEvent.update(passwordInput, '123')

    await fireEvent.click(submitButton)

    expect(screen.getByDisplayValue('julia@example.com')).toBeInTheDocument()
  })

  test('позволяет удалить учетную запись', async () => {
    await render(UserTable)

    const deleteButtons = screen.getAllByRole('button', { name: /удалить запись/i })
    expect(deleteButtons).toHaveLength(5)

    await fireEvent.click(deleteButtons[0])

    const remainingLogins = screen.getAllByPlaceholderText('Логин')
    expect(remainingLogins).toHaveLength(4)
  })  
})

  test('переключает видимость пароля при клике на глаз', async () => {
    await render(UserTable)

    const toggleButtons = screen.getAllByRole('button', { name: /показать пароль/i })
    expect(toggleButtons).toHaveLength(2)

    await fireEvent.click(toggleButtons[0])

    const hideButton = screen.getAllByRole('button', { name: /скрыть пароль/i })
     expect(hideButton).toHaveLength(2)
  })

  test('обрабатывает метку с разделителем ;', async () => {
    await render(UserTable)

    const firstLabelInput = screen.getByDisplayValue('XXXX')
    await fireEvent.update(firstLabelInput, 'XXXX')

    expect(firstLabelInput).toHaveValue('XXXX')
  })
