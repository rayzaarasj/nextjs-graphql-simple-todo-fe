import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  Button,
} from '@material-ui/core';
import React, { FC } from 'react';

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            style={{ borderRight: '0.1em solid white', padding: '0.5em' }}
          >
            <Link href="/" color="inherit" underline="none">
              SimpleTodo
            </Link>
          </Typography>
          <Button color="inherit" href="todos">
            Todos
          </Button>
          <Button color="inherit" href="categories">
            Categories
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
