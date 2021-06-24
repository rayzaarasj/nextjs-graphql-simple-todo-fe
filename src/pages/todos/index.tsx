import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Todo } from '../../components/Todo';
import { useGetTodosQuery } from '../../__generated__/graphql';

export type TodoType = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  categories: {
    id: number;
    category: string;
  }[];
};

export default function Todos(): ReactElement {
  const { data, loading } = useGetTodosQuery();
  const todos: TodoType[] = [];
  data?.todos?.forEach((todo) => {
    todos.push({
      id: parseInt(todo.id),
      title: todo.title || '',
      description: todo.description || '',
      deadline: new Date(todo.deadline || 0),
      categories:
        todo.categories?.map((category) => {
          return {
            id: parseInt(category.id),
            category: category.category || '',
          };
        }) || [],
    });
  });

  if (loading) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h1">Todos</Typography>
      <Box height="2rem" />
      {todos.map((data: TodoType, index: number) => {
        return (
          <Todo
            key={index}
            id={data.id}
            title={data.title}
            description={data.description}
            deadline={data.deadline}
            categories={data.categories}
          ></Todo>
        );
      })}
    </Container>
  );
}