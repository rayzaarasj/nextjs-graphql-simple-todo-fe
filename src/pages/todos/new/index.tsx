import { TodoInput } from '@components/TodoInput';
import { Container, Typography, Box } from '@material-ui/core';
import { TodoInputState } from '@type/Todo';
import React, { ReactElement } from 'react';
import { utcDateFormatter } from 'src/lib/utils';
import { useCreateTodoMutation } from '@generated/graphql';

export default function NewTodo(): ReactElement {
  const [createTodoMutation] = useCreateTodoMutation();

  const handleSubmit = (
    _event: React.SyntheticEvent,
    input: TodoInputState
  ) => {
    createTodoMutation({
      variables: {
        title: input.title,
        description: input.description,
        deadline: utcDateFormatter(input.deadline),
        categories: input.categories
          .filter((category) => {
            return category.isChecked;
          })
          .map((category) => {
            return category.id;
          }),
      },
    })
      .then((value) => {
        const todoId = value.data?.createTodo?.todo.id;
        const todoTitle = value.data?.createTodo?.todo.title;
        const todoDescription = value.data?.createTodo?.todo.description;
        const todoDeadline = value.data?.createTodo?.todo.deadline;
        const todoCategories = value.data?.createTodo?.todo.categories?.map(
          (category) => {
            return category.category;
          }
        );
        alert(
          `Category created\nId : ${todoId}\nTitle : ${todoTitle}\n` +
            `Description : ${todoDescription}\nDeadline : ${todoDeadline}\n` +
            `Category(ies) : ${todoCategories}`
        );
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Container>
      <Typography variant="h1">New Todo</Typography>
      <Box height="2rem" />
      <TodoInput handleSubmit={handleSubmit} />
    </Container>
  );
}
