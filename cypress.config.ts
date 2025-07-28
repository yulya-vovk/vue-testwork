import vue  from '@vitejs/plugin-vue';
import { defineConfig } from 'cypress'

export default defineConfig({
   component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: async () => {
        const { resolve } = require('path')
        return {
          resolve: {
            alias: {
              '@': resolve(__dirname, 'src')
            }
          }
        }
      }
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
    e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    setupNodeEvents(on, config) {
    }
  }
  })