import { Card, CardContent, Link, Typography } from '@material-ui/core';
import React, { FC } from 'react';

type CategoryProps = {
  id: number;
  category: string;
};

export const Category: FC<CategoryProps> = (props: CategoryProps) => {
  return (
    <Card id={props.id.toString()}>
      <CardContent>
        <Typography align="center">
          <Link
            href={`/categories/${props.id.toString()}`}
            color="inherit"
            underline="none"
          >
            {props.category}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};
