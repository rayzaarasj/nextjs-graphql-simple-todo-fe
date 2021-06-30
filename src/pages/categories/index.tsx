import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Category } from '@components/Category';
import { useGetCategoriesQuery } from '@generated/graphql';
import { CategoryType } from '@type/Category';

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
      <Typography variant="h1">Categories</Typography>
      <Box height="2rem" />
      <Button variant="contained" color="primary" href="/categories/new">
        New Category
      </Button>
      <Box height="1rem" />
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
