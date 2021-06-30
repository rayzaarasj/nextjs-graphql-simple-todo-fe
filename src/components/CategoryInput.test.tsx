/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { CategoryInput } from './CategoryInput';

describe('New Category Input Component', () => {
  beforeEach(() => {
    render(<CategoryInput handleSubmit={jest.fn()}></CategoryInput>);
  });

  it('shows correct data', () => {
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    const categoryInput = screen.getByRole('textbox');
    expect(categoryInput).toHaveValue('');
    user.type(categoryInput, 'mockCategoryInput');
    expect(categoryInput).toHaveValue('mockCategoryInput');
  });
});

describe('Edit Category Input Component', () => {
  const mockData = 'mock-category';

  beforeEach(() => {
    render(
      <CategoryInput handleSubmit={jest.fn()} input={mockData}></CategoryInput>
    );
  });

  it('shows correct data', () => {
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    const categoryInput = screen.getByRole('textbox');
    expect(categoryInput).toHaveValue(mockData);
    user.clear(categoryInput);
    user.type(categoryInput, 'new mock-category');
    expect(categoryInput).toHaveValue('new mock-category');
  });
});
