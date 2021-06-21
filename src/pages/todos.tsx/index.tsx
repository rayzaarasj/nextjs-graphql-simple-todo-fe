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

  return (
    <Container style={{ marginTop: '1rem' }}>
      {mockDatas.map((data, index) => {
        return (
          <Todo
            key={index}
            id={parseInt(data.id)}
            title={data.title}
            description={data.description}
          ></Todo>
        );
      })}
    </Container>
  );
}
