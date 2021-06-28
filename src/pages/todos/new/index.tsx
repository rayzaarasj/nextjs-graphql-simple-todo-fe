import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  Chip,
  CircularProgress,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { CategoryState, CategoryType } from '@type/Category';
import React, { ReactElement, useState, useEffect } from 'react';
import {
  useCreateTodoMutation,
  useGetCategoriesQuery,
} from 'src/__generated__/graphql';

interface InputState {
  title: string;
  description: string;
  deadline: Date;
  categories: CategoryState[];
}

function dateFormatHelper(date: Date): string {
  date.toUTCString();
  return (
    `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}` +
    `T${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}Z`
  );
}

export default function NewTodo(): ReactElement {
  const [inputState, updateInputState] = useState<InputState>({
    title: '',
    description: '',
    deadline: new Date(0),
    categories: [],
  });
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const [createTodoMutation] = useCreateTodoMutation();

  const categories: CategoryType[] = [];
  categoriesData?.categories?.forEach((category) => {
    categories.push({
      id: parseInt(category.id),
      category: category.category || '',
    });
  });

  useEffect(() => {
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
  }, [categoriesData]);

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createTodoMutation({
      variables: {
        title: inputState.title,
        description: inputState.description,
        deadline: dateFormatHelper(inputState.deadline),
        categories: inputState.categories
          .filter((category) => {
            return category.isChecked;
          })
          .map((category) => {
            return category.id;
          }),
      },
    })
      .then((value) => {
        const todoId = value.data?.createTodo?.todo.id;
        const todoTitle = value.data?.createTodo?.todo.title;
        const todoDescription = value.data?.createTodo?.todo.description;
        const todoDeadline = value.data?.createTodo?.todo.deadline;
        const todoCategories = value.data?.createTodo?.todo.categories?.map(
          (category) => {
            return category.category;
          }
        );
        alert(
          `Category created\nId : ${todoId}\nTitle : ${todoTitle}\n` +
            `Description : ${todoDescription}\nDeadline : ${todoDeadline}\n` +
            `Category(ies) : ${todoCategories}`
        );
      })
      .catch((e) => {
        alert(e.message);
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
      <Typography variant="h1">New Todo</Typography>
      <Box height="2rem" />
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField label="Title" fullWidth onChange={handleTitleChange} />
          <Box height="1rem" />
          <TextField
            label="Description"
            fullWidth
            onChange={handleDescriptionChange}
          />
          <Box height="1rem" />
          <TextField
            label="Deadline"
            type="datetime-local"
            fullWidth
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
            Create
          </Button>
        </Container>
      </form>
    </Container>
  );
}
