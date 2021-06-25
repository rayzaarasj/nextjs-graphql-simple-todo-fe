import { Container, Typography, Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

export default function NewTodo(): ReactElement {
  return (
    <Container>
      <Typography variant="h1">New Todo</Typography>
      <Box height="2rem" />
    </Container>
  );
}
