import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useCreateCategoryMutation } from 'src/__generated__/graphql';

export default function NewCategory(): ReactElement {
  const [categoryInput, updateCategoryInput] = useState<string>('');
  const [createCategoryMutation] = useCreateCategoryMutation();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCategoryInput(event.target.value);
  };

  const handleSubmit = () => {
    createCategoryMutation({ variables: { category: categoryInput } })
      .then((value) => {
        const categoryId = value.data?.createCategory?.category.id;
        const categoryName = value.data?.createCategory?.category.category;
        alert(
          `Category created\nId : ${categoryId}\nCategory : ${categoryName}`
        );
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Container>
      <Typography variant="h1">New Category</Typography>
      <Box height="2rem" />
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            label="Category"
            fullWidth
            onChange={handleCategoryChange}
          />
          <Box height="1rem" />
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Container>
      </form>
    </Container>
  );
}
