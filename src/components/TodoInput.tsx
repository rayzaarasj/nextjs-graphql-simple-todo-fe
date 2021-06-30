import {
  Container,
  Box,
  TextField,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { CategoryState, CategoryType } from '@type/Category';
import { TodoInputState } from '@type/Todo';
import React, { FC, useEffect, useState } from 'react';
import { dateInputFormatter } from 'src/lib/utils';
import { useGetCategoriesQuery } from '@generated/graphql';

type TodoInputProps = {
  handleSubmit: (_event: React.SyntheticEvent, input: TodoInputState) => void;
  input?: TodoInputState;
};

export const TodoInput: FC<TodoInputProps> = (props: TodoInputProps) => {
  const [inputState, updateInputState] = useState<TodoInputState>(
    props.input || {
      title: '',
      description: '',
      deadline: new Date(0),
      categories: [],
    }
  );
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();

  const categories: CategoryType[] = [];
  categoriesData?.categories?.forEach((category) => {
    categories.push({
      id: parseInt(category.id),
      category: category.category || '',
    });
  });

  useEffect(() => {
    if (props.input?.categories) {
      updateInputState((prevState) => {
        return { ...prevState, categories: props.input?.categories || [] };
      });
    } else {
      const categoriesInitialState: CategoryState[] = [];
      categoriesData?.categories?.forEach((category) => {
        categoriesInitialState.push({
          id: parseInt(category.id),
          category: category.category || '',
          isChecked: false,
        });
      });
      updateInputState((prevState) => {
        return { ...prevState, categories: categoriesInitialState };
      });
    }
  }, [categoriesData, props.input?.categories]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateInputState({ ...inputState, title: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateInputState({ ...inputState, description: event.target.value });
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateInputState({ ...inputState, deadline: new Date(event.target.value) });
  };

  const handleCategoriesChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const id = (event.target.value as unknown[])[
      (event.target.value as unknown[]).length - 1
    ];
    const newCategoriesState = [...inputState.categories];
    newCategoriesState.map((category) => {
      if (category.id === (id as number)) {
        category.isChecked = !category.isChecked;
      }
    });
    updateInputState({
      ...inputState,
      categories: newCategoriesState,
    });
  };

  if (categoriesLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <form onSubmit={(event) => props.handleSubmit(event, inputState)}>
        <Container>
          <TextField
            label="Title"
            fullWidth
            value={inputState.title}
            onChange={handleTitleChange}
          />
          <Box height="1rem" />
          <TextField
            label="Description"
            fullWidth
            value={inputState.description}
            onChange={handleDescriptionChange}
          />
          <Box height="1rem" />
          <TextField
            label="Deadline"
            type="datetime-local"
            fullWidth
            value={
              props.input ? dateInputFormatter(inputState.deadline) : undefined
            }
            onChange={handleDeadlineChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box height="1rem" />
          <InputLabel shrink={true}>Categories</InputLabel>
          <Select
            multiple
            fullWidth
            value={inputState?.categories}
            onChange={handleCategoriesChange}
            renderValue={(selected) => (
              <div>
                {(selected as CategoryState[]).map((category) => {
                  if (category.isChecked) {
                    return (
                      <Chip key={category.category} label={category.category} />
                    );
                  }
                })}
              </div>
            )}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  <Checkbox
                    checked={
                      inputState.categories.find((temp) => {
                        return temp.id === category.id;
                      })?.isChecked
                    }
                  />
                  <ListItemText primary={category.category} />
                </MenuItem>
              );
            })}
          </Select>
          <Box height="1rem" />
          <Button type="submit" color="primary" variant="contained">
            {props.input ? 'Edit' : 'Create'}
          </Button>
        </Container>
      </form>
    </Container>
  );
};
