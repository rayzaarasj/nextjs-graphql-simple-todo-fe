import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import { Todo } from '@components/Todo';
import {
  useGetCategoryByIdQuery,
  useGetTodosByCategoryIdQuery,
} from '@generated/graphql';
import { TodoType } from '@type/Todo';

export default function Category(): ReactElement {
  const router = useRouter();
  const categoryId = router.query.id as string;
  const { data: categoryData, loading: categoryLoading } =
    useGetCategoryByIdQuery({
      variables: { id: parseInt(categoryId) },
    });
  const { data: todosData, loading: todosLoading } =
    useGetTodosByCategoryIdQuery({
      variables: {
        id: parseInt(categoryId),
      },
    });

  const todos: TodoType[] = [];
  todosData?.todosByCategoryIds?.forEach((todo) => {
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

  if (todosLoading || categoryLoading) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h1">
        {`${categoryData?.categoryById?.category}'s Todos`}
      </Typography>
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
