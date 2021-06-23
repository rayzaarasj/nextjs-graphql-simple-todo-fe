import { Box, CircularProgress, Container, Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Category } from '../../components/Category';
import { useGetCategoriesQuery } from '../../__generated__/graphql';

type CategoryType = {
  id: number;
  category: string;
};

export default function Categories(): ReactElement {
  const { data, loading } = useGetCategoriesQuery();
  const categories: CategoryType[] = [];
  data?.categories?.forEach((category) => {
    categories.push({
      id: parseInt(category.id),
      category: category.category || '',
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
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {categories.map((category: CategoryType, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Category
                key={index}
                id={category.id}
                category={category.category}
              ></Category>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
