# Vue 3 + Pinia + Vite 
> **SPA на Vue 3 с Pinia, TypeScript и полным набором тестов: unit, E2E (Cypress), a11y. Демонстрирует навыки full-stack frontend-разработки.**

[![Vue](https://img.shields.io/badge/Vue-3-green?logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-4285F4?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Test-Vitest-35495E?logo=jest)](https://vitest.dev)
[![Cypress](https://img.shields.io/badge/E2E-Cypress-F16529?logo=cypress)](https://www.cypress.io)
[![Pinia](https://img.shields.io/badge/Pinia-FF4949?logo=pinia)](https://pinia.vuejs.org)

Этот проект создан для демонстрации навыков работы с **Vue 3**, **Pinia**, **Vite**, **TypeScript** и **автоматизированными тестами**.

   Используемые технологии:
- **Vue 3** (Composition API)
- **Pinia** — управление состоянием
- **Vite** — сборка
- **TypeScript** — типизация
- **Vitest** — unit-тесты
- **Cypress** — E2E-тесты
- **@testing-library/vue** — тестирование компонентов

   Проект представляет собой **таблицу учётных записей** с возможностью:
- Добавления, редактирования и удаления записей
- Управления метками (через `;`)
- Переключения видимости пароля
- Валидации форм

---

## Запуск проекта локально

## 🚀 Как запустить локально

git clone https://github.com/yulya-vovk/vue-testwork.git
cd vue-testwork
npm install
npm run dev

**Dev-сервер:** http://localhost:5173
**Тесты:** npm run test
**E2E:** npm run test:e2e

## 🎯 Что тестируется?

- ✅ **Рендеринг компонента** — заголовок, таблица, кнопки
- ✅ **Добавление новой учётной записи** — форма, валидация, отправка
- ✅ **Удаление записи** — клик, обновление состояния
- ✅ **Переключение видимости пароля** — `showPassword`, иконки глаза
- ✅ **Обработка меток** — разделитель `;`, обновление `labels`
- ✅ **Валидация форм** — обязательные поля, состояние `isValid`
- ✅ **Доступность (a11y)** — `aria-label`, семантические атрибуты

## 📸 Скриншот

![UserTable Interface](docs/angular-cli-testwork.png)
