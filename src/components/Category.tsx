import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@material-ui/core';
import Router from 'next/router';
import React, { FC } from 'react';
import { useDeleteCategoryMutation } from '../__generated__/graphql';

type CategoryProps = {
  id: number;
  category: string;
};

export const Category: FC<CategoryProps> = (props: CategoryProps) => {
  const [deleteCategoryMutation] = useDeleteCategoryMutation({
    variables: { id: props.id },
  });

  const handleDeleteCategoryClick = () => {
    deleteCategoryMutation()
      .then(() => {
        alert('Category deleted');
        Router.reload();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Card id={props.id.toString()}>
      <CardContent>
        <Typography align="center">
          <Typography variant="h5">
            <Link
              href={`/categories/${props.id.toString()}`}
              color="inherit"
              underline="none"
            >
              {props.category}
            </Link>
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDeleteCategoryClick} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
