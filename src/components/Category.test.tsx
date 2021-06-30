/**
 * @jest-environment jsdom
 */

import { MockedProvider } from '@apollo/client/testing';
import { DeleteCategoryDocument } from '@generated/graphql';
import { render, screen } from '@testing-library/react';
import { CategoryType } from '@type/Category';
import React from 'react';
import { Category } from './Category';

describe('Category Component', () => {
  const mocks = [
    {
      request: {
        query: DeleteCategoryDocument,
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

  const mockData: CategoryType = {
    id: 1,
    category: 'mock-category',
  };

  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Category id={mockData.id} category={mockData.category}></Category>
      </MockedProvider>
    );
  });

  it('shows correct data', () => {
    expect(screen.getByText(mockData.category)).toBeInTheDocument();
  });

  it('has buttons', () => {
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
