import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // El default excluye `**/dist/**`, lo que dejaría afuera tests/dist.
    exclude: ['**/node_modules/**'],
    environment: 'node',
  },
});
