import { Container, Box, TextField, Button } from '@material-ui/core';
import React, { FC, useState } from 'react';

type CategoryInputProps = {
  handleSubmit: (_event: React.SyntheticEvent, input: string) => void;
  input?: string;
};

export const CategoryInput: FC<CategoryInputProps> = (
  props: CategoryInputProps
) => {
  const [categoryInput, updateCategoryInput] = useState<string>(
    props.input || ''
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCategoryInput(event.target.value);
  };
  return (
    <Container>
      <form onSubmit={(event) => props.handleSubmit(event, categoryInput)}>
        <Container>
          <TextField
            label="Category"
            fullWidth
            onChange={handleCategoryChange}
            value={categoryInput}
          />
          <Box height="1rem" />
          <Button type="submit" color="primary" variant="contained">
            {categoryInput === '' ? 'Create' : 'Edit'}
          </Button>
        </Container>
      </form>
    </Container>
  );
};
