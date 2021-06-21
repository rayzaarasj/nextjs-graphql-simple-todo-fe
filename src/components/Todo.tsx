import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

type TodoProps = {
  id: number;
  title: string;
  description: string;
  deadline?: Date;
  categories?: {
    id: number;
    category: string;
  }[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export const Todo: FC<TodoProps> = (props: TodoProps) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.heading}>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
