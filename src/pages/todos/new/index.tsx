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
} from '@material-ui/core';
import { CategoryType } from '@type/Category';
import React, { ReactElement, useState } from 'react';
import { useGetCategoriesQuery } from 'src/__generated__/graphql';

interface InputState {
  title: string;
  description: string;
  deadline: Date;
  categories: CategoryType[];
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

  const categories: CategoryType[] = [];
  categoriesData?.categories?.forEach((category) => {
    categories.push({
      id: parseInt(category.id),
      category: category.category || '',
    });
  });

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
      <form>
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
            onChange={handleDeadlineChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box height="1rem" />
          <InputLabel>Categories</InputLabel>
          <Select
            multiple
            fullWidth
            value={inputState?.categories}
            renderValue={(selected) => (
              <div>
                {(selected as CategoryType[]).map((category) => (
                  <Chip key={category.category} label={category.category} />
                ))}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category.category} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
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
