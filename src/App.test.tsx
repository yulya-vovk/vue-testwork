import { render, screen } from '@testing-library/vue'
import App from './App.vue'

test('рендерит заголовок', () => {
  render(App)
  expect(screen.getByText(/учетные записи/i)).toBeInTheDocument()
})