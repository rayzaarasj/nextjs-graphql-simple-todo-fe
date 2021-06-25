import { Container, Typography, Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

export default function NewCategory(): ReactElement {
  return (
    <Container>
      <Typography variant="h1">New Category</Typography>
      <Box height="2rem" />
    </Container>
  );
}
