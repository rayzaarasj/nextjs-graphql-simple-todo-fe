import { TodoInput } from '@components/TodoInput';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { CategoryState } from '@type/Category';
import { TodoInputState } from '@type/Todo';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  useGetCategoriesQuery,
  useGetTodoByIdQuery,
} from 'src/__generated__/graphql';

export default function UpdateCategory(): ReactElement {
  const router = useRouter();
  const todoId = router.query.id as string;
  const { data: todoData, loading: todoLoading } = useGetTodoByIdQuery({
    variables: { id: parseInt(todoId) },
  });
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();

  const todoCategoryIds: Set<number> = new Set<number>();
  todoData?.todoById?.categories?.forEach((category) => {
    todoCategoryIds.add(parseInt(category.id));
  });

  const categories: CategoryState[] = [];
  categoriesData?.categories?.forEach((category) => {
    const intId = parseInt(category.id);
    categories.push({
      id: intId,
      category: category.category || '',
      isChecked: todoCategoryIds.has(intId),
    });
  });

  const todoObject: TodoInputState = {
    title: todoData?.todoById?.title || '',
    description: todoData?.todoById?.description || '',
    deadline: new Date(todoData?.todoById?.deadline || ''),
    categories: categories,
  };

  const handleSubmit = (
    _event: React.SyntheticEvent,
    input: TodoInputState
  ) => {
    console.log(input);
  };

  if (categoriesLoading || todoLoading) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h1">Update Todo</Typography>
      <Box height="2rem" />
      <Typography variant="h5">Todo Id : {todoId}</Typography>
      <Box height="2rem" />
      <TodoInput handleSubmit={handleSubmit} input={todoObject} />
    </Container>
  );
}
