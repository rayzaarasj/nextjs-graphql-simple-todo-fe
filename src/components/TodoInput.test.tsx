/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoInput } from './TodoInput';
import React from 'react';
import { GetCategoriesDocument } from '@generated/graphql';
import { TodoInputState } from '@type/Todo';
import { dateInputFormatter } from 'src/lib/utils';

const mocks = [
  {
    request: {
      query: GetCategoriesDocument,
    },
    result: {
      data: {
        categories: [
          {
            id: 1,
            category: 'mock-category-1',
          },
          {
            id: 1,
            category: 'mock-category-1',
          },
        ],
      },
    },
    loading: false,
  },
];

describe('New Todo Input Component', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoInput handleSubmit={jest.fn()}></TodoInput>
      </MockedProvider>
    );
  });

  it('shows correct data', async () => {
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
      const titleInput = screen.getByTestId('title-input');
      expect(titleInput).toHaveValue('');

      const descriptionInput = screen.getByTestId('description-input');
      expect(descriptionInput).toHaveValue('');

      const deadlineInput = screen.getByTestId('deadline-input');
      expect(deadlineInput).toHaveValue('');
    });
  });
});

describe('Edit Todo Input Component', () => {
  const mockTodo: TodoInputState = {
    title: 'mock-title',
    description: 'mock-description',
    deadline: new Date(),
    categories: [{ id: 1, category: 'mock-category-1', isChecked: true }],
  };
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoInput handleSubmit={jest.fn()} input={mockTodo}></TodoInput>
      </MockedProvider>
    );
  });

  it('shows correct data', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
      const titleInput = screen.getByTestId('title-input');
      expect(titleInput).toHaveValue(mockTodo.title);

      const descriptionInput = screen.getByTestId('description-input');
      expect(descriptionInput).toHaveValue(mockTodo.description);

      const deadlineInput = screen.getByTestId('deadline-input');
      expect(deadlineInput).toHaveValue(dateInputFormatter(mockTodo.deadline));

      expect(
        screen.getByText(mockTodo.categories[0].category)
      ).toBeInTheDocument();
    });
  });
});
