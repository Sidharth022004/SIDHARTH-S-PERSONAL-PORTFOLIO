# Testing Setup

This project uses Vitest and React Testing Library for testing React components.

## Test Scripts

The following test scripts are available in the `package.json` file:

- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## Test Configuration

- Tests are configured to run with jsdom environment
- Setup file: `src/test/setup.ts`
- Test files are located in `src/__tests__` and `src/components/__tests__` directories
- Test files use the `.test.tsx` extension

## Running Tests

To run tests, use one of the following commands:

```bash
# Run tests in watch mode (recommended during development)
npm run test

# Run tests once (for CI/CD or validation)
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

Tests are written using:
- Vitest for test runner and assertions
- React Testing Library for rendering and interacting with components
- Jest DOM matchers for additional assertions

Example test structure:
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Component from '../Component';

describe('Component', () => {
  it('renders without crashing', () => {
    render(<Component />);
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});