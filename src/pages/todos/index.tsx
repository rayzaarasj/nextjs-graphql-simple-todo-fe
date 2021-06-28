import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Todo } from '@components/Todo';
import { useGetTodosQuery } from 'src/__generated__/graphql';
import { TodoType } from '@type/Todo';

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
      <Button variant="contained" color="primary" href="/todos/new">
        New Todo
      </Button>
      <Box height="1rem" />
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
