import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


export default defineConfig({
  plugins: [Vue()],
   resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './src/setupTests.ts',
      './src/test-setup.ts',
    ],
    testTransformMode: {
      web: ['*.tsx', '*.ts'] 
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'test/',
        'dist/',
        '.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts'
      ]
    },
  },

})