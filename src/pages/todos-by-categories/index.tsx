import {
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { Box, CircularProgress } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import {
  useGetCategoriesQuery,
  useGetTodosByCategoryIdsQuery,
} from '../../__generated__/graphql';
import { useEffect } from 'react';
import { Todo } from '../../components/Todo';
import { TodoType } from '../todos';

interface CategoryState {
  id: number;
  category: string;
  isChecked: boolean;
}

export default function TodosByCategories(): ReactElement {
  const [categories, updatecategories] = useState<CategoryState[]>([]);
  const [todos, updateTodos] = useState<TodoType[]>([]);
  const [categoryIdsInput, updatecategoryIdsInput] = useState<number[]>([]);
  const { data: dataCategories, loading: loadingCategories } =
    useGetCategoriesQuery();
  const { data: todosData } = useGetTodosByCategoryIdsQuery({
    variables: { ids: categoryIdsInput },
  });

  useEffect(() => {
    const initialState: CategoryState[] = [];
    dataCategories?.categories?.forEach((category) => {
      initialState.push({
        id: parseInt(category.id),
        category: category.category || '',
        isChecked: false,
      });
    });

    updatecategories(initialState);
  }, [dataCategories]);

  useEffect(() => {
    const newTodosState: TodoType[] = [];
    todosData?.todosByCategoryIds?.forEach((todo) => {
      newTodosState.push({
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
    updateTodos(newTodosState);
  }, [todosData]);

  if (loadingCategories) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleCategoryCheckChange = (index: number) => {
    const newArr = [...categories];
    newArr[index].isChecked = !categories[index].isChecked;
    updatecategories(newArr);
  };

  const handleSearchButtonClick = () => {
    const newArr: number[] = [];
    categories.forEach((category) => {
      if (category.isChecked) {
        newArr.push(category.id);
      }
    });
    updatecategoryIdsInput(newArr);
  };

  const handleResetButtonClick = () => {
    const newArr = categories.map((category) => {
      category.isChecked = false;
      return category;
    });
    updatecategories(newArr);
    updateTodos([]);
  };

  return (
    <Container>
      <Typography variant="h1">Todos by Categories</Typography>
      <Box height="2rem" />
      {categories.map((category: CategoryState, index: number) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={category.isChecked}
                onChange={() => handleCategoryCheckChange(index)}
              />
            }
            label={category.category}
          />
        );
      })}
      <Box height="1rem" />
      <Grid container>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchButtonClick}
        >
          Search
        </Button>
        <Box width="1rem" />
        <Button variant="contained" onClick={handleResetButtonClick}>
          Reset
        </Button>
      </Grid>
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
