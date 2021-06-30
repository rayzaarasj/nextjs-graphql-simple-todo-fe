import {
  Button,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Router from 'next/router';
import React, { FC } from 'react';
import { useDeleteTodoMutation } from '@generated/graphql';

type TodoProps = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  categories: {
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
  const [deleteTodoMutation] = useDeleteTodoMutation({
    variables: { id: props.id },
  });

  const handleDeleteTodoClick = () => {
    deleteTodoMutation()
      .then(() => {
        alert('Todo deleted');
        Router.reload();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.heading}>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.description}</Typography>
      </AccordionDetails>
      <AccordionSummary>
        <Typography>Deadline : {props.deadline.toString()}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Categories: </Typography>
        {props.categories.map((data, index) => {
          return (
            <Container key={index}>
              <Typography>
                <Link
                  href={`/categories/${data.id.toString()}`}
                  color="inherit"
                  underline="none"
                >
                  {data.category}
                </Link>
              </Typography>
            </Container>
          );
        })}
      </AccordionDetails>
      <AccordionDetails>
        <Button onClick={handleDeleteTodoClick}>Delete</Button>
        <Button>
          <Link
            href={`/todos/${props.id.toString()}/edit`}
            color="inherit"
            underline="none"
          >
            Edit
          </Link>
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
