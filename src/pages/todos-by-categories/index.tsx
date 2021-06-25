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
import { useGetCategoriesQuery } from '../../__generated__/graphql';
import { useEffect } from 'react';

interface CategoryState {
  id: number;
  category: string;
  isChecked: boolean;
}

export default function TodosByCategories(): ReactElement {
  const [categories, updatecategories] = useState<CategoryState[]>([]);
  const { data, loading } = useGetCategoriesQuery();

  useEffect(() => {
    const initialState: CategoryState[] = [];
    data?.categories?.forEach((category) => {
      initialState.push({
        id: parseInt(category.id),
        category: category.category || '',
        isChecked: false,
      });
    });

    updatecategories(initialState);
  }, [data]);

  if (loading) {
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
    console.log(categories);
  };

  const handleResetButtonClick = () => {
    const newArr = categories.map((category) => {
      category.isChecked = false;
      return category;
    });
    updatecategories(newArr);
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
    </Container>
  );
}
