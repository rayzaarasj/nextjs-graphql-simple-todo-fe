import { Card, CardContent, Typography } from '@material-ui/core';
import React, { FC } from 'react';

type CategoryProps = {
  id: number;
  category: string;
};

export const Category: FC<CategoryProps> = (props: CategoryProps) => {
  return (
    <Card id={props.id.toString()}>
      <CardContent>
        <Typography align="center">{props.category}</Typography>
      </CardContent>
    </Card>
  );
};
