import { CategoryInput } from '@components/CategoryInput';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from 'src/__generated__/graphql';

export default function EditCategory(): ReactElement {
  const router = useRouter();
  const categoryId = router.query.id as string;
  const { data: categoryData, loading: categoryLoading } =
    useGetCategoryByIdQuery({
      variables: { id: parseInt(categoryId) },
    });
  const [updateCategoryMutation] = useUpdateCategoryMutation();

  const handleSubmit = (_event: React.SyntheticEvent, input: string) => {
    updateCategoryMutation({
      variables: { id: parseInt(categoryId), category: input },
    })
      .then((value) => {
        const categoryId = value.data?.updateCategory?.category.id;
        const categoryName = value.data?.updateCategory?.category.category;
        alert(
          `Category updated\nId : ${categoryId}\nCategory : ${categoryName}`
        );
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  if (categoryLoading) {
    return (
      <Box marginY="40px" display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h1">Update Category</Typography>
      <Box height="2rem" />
      <Typography variant="h5">Category Id : {categoryId}</Typography>
      <Box height="2rem" />
      <CategoryInput
        handleSubmit={handleSubmit}
        input={categoryData?.categoryById?.category || ''}
      />
    </Container>
  );
}
