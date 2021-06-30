/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TodoType } from '@type/Todo';
import React from 'react';
import { Todo } from './Todo';
import { DeleteTodoDocument } from '@generated/graphql';

describe('Todo Component', () => {
  const mocks = [
    {
      request: {
        query: DeleteTodoDocument,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {
          deletedId: 1,
        },
      },
    },
  ];
  it('shows correct data', () => {
    const mockData: TodoType = {
      id: 1,
      title: 'mock-title',
      description: 'mock-description',
      deadline: new Date(),
      categories: [
        {
          id: 1,
          category: 'mock-category-1',
        },
        { id: 2, category: 'mock-category-2' },
      ],
    };
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Todo
          id={mockData.id}
          title={mockData.title}
          description={mockData.description}
          deadline={mockData.deadline}
          categories={mockData.categories}
        ></Todo>
      </MockedProvider>
    );

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Deadline : ${mockData.deadline.toString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData.categories[0].category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData.categories[1].category)
    ).toBeInTheDocument();
  });
});
