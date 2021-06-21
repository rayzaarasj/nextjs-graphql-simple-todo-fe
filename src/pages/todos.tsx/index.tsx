import { Container } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Todo } from '../../components/Todo';

export default function Todos(): ReactElement {
  const mockDatas = [
    {
      id: '38',
      title: 'Create Frontend',
      description: 'Create Frontend for Personal Project',
      deadline: '2021-06-21T17:00:00Z',
      categories: [
        {
          id: '34',
          category: 'frontend',
        },
      ],
    },
    {
      id: '39',
      title: 'Integrate Frontend and Backend',
      description: 'Integrate Frontend and Backend for Personal Project',
      deadline: '2021-06-22T17:00:00Z',
      categories: [
        {
          id: '34',
          category: 'frontend',
        },
      ],
    },
  ];

  const mockData = mockDatas[0];

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Todo
        id={parseInt(mockData.id)}
        title={mockData.title}
        description={mockData.description}
      />
      <Todo id={2} title="test title 2" description="test description 2" />
      <Todo id={3} title="test title 3" description="test description 3" />
    </Container>
  );
}
