import { Checkbox, Container, FormControlLabel } from '@material-ui/core';
import { Box, CircularProgress } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useGetCategoriesQuery } from '../../__generated__/graphql';
import { CategoryType } from '../categories';

export default function TodosByCategories(): ReactElement {
  const [categoryIsCheked, updatecategoryIsChecked] = useState<
    Map<number, boolean>
  >(new Map<number, boolean>());
  const { data, loading } = useGetCategoriesQuery();
  const categories: CategoryType[] = [];
  data?.categories?.forEach((category) => {
    categories.push({
      id: parseInt(category.id),
      category: category.category || '',
    });
    categoryIsCheked.set(parseInt(category.id), false);
  });

  // add more mock checboxes
  for (let i = 0; i < 100; i++) {
    categories.push({ id: i + 100, category: `categories-${i + 100}` });
    categoryIsCheked.set(i + 100, false);
  }

  if (loading) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleCategoryCheckChange = (id: number) => {
    console.log(categoryIsCheked);
    const newState = new Map(
      categoryIsCheked.set(id, !categoryIsCheked.get(id))
    );
    updatecategoryIsChecked(newState);
  };

  return (
    <Container>
      {categories.map((category: CategoryType, index: number) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={categoryIsCheked.get(category.id)}
                onChange={() => handleCategoryCheckChange(category.id)}
                value={category.id}
              />
            }
            label={category.category}
          />
        );
      })}
    </Container>
  );
}
