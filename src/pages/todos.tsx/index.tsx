import { Container } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Todo } from '../../components/Todo';

type MockData = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  categories: {
    id: string;
    category: string;
  }[];
};

export default function Todos(): ReactElement {
  const mockDatas: MockData[] = [
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
        {
          id: '35',
          category: 'backend',
        },
      ],
    },
  ];

  return (
    <Container style={{ padding: '2rem' }}>
      {mockDatas.map((data: MockData, index: number) => {
        return (
          <Todo
            key={index}
            id={parseInt(data.id)}
            title={data.title}
            description={data.description}
            deadline={new Date(data.deadline)}
            categories={data.categories.map((category) => {
              return { id: parseInt(category.id), category: category.category };
            })}
          ></Todo>
        );
      })}
    </Container>
  );
}
