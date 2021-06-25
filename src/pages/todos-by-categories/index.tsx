import { Checkbox, Container, FormControlLabel } from '@material-ui/core';
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

  return (
    <Container>
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
    </Container>
  );
}
