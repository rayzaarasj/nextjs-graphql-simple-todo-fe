import { CategoryInput } from '@components/CategoryInput';
import { Box, Container, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useCreateCategoryMutation } from '@generated/graphql';

export default function NewCategory(): ReactElement {
  const [createCategoryMutation] = useCreateCategoryMutation();

  const handleSubmit = (_event: React.SyntheticEvent, input: string) => {
    createCategoryMutation({ variables: { category: input } })
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
      <CategoryInput handleSubmit={handleSubmit} />
    </Container>
  );
}
