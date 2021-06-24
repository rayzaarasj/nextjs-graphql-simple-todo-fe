import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
};

export type Category = {
  __typename?: 'Category';
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  todos?: Maybe<Array<Todo>>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of CreateCategory */
export type CreateCategoryInput = {
  category: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCategory */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload';
  category: Category;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateTodo */
export type CreateTodoInput = {
  categories: Array<Scalars['Int']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deadline: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

/** Autogenerated return type of CreateTodo */
export type CreateTodoPayload = {
  __typename?: 'CreateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  todo: Todo;
};

/** Autogenerated input type of DeleteCategory */
export type DeleteCategoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** Autogenerated return type of DeleteCategory */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedId: Scalars['Int'];
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteTodo */
export type DeleteTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** Autogenerated return type of DeleteTodo */
export type DeleteTodoPayload = {
  __typename?: 'DeleteTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedId: Scalars['Int'];
  errors: Array<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<CreateCategoryPayload>;
  createTodo?: Maybe<CreateTodoPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  deleteTodo?: Maybe<DeleteTodoPayload>;
  /** An example field added by the generator */
  testField: Scalars['String'];
  updateCategory?: Maybe<UpdateCategoryPayload>;
  updateTodo?: Maybe<UpdateTodoPayload>;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  categoryById?: Maybe<Category>;
  /** An example field added by the generator */
  testField: Scalars['String'];
  todoById?: Maybe<Todo>;
  todos?: Maybe<Array<Todo>>;
  todosByCategoryIds?: Maybe<Array<Todo>>;
  todosByCategoryNames?: Maybe<Array<Todo>>;
  todosByTitle?: Maybe<Array<Todo>>;
};


export type QueryCategoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTodoByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTodosByCategoryIdsArgs = {
  categoryIds: Array<Scalars['Int']>;
};


export type QueryTodosByCategoryNamesArgs = {
  categoryNames: Array<Scalars['String']>;
};


export type QueryTodosByTitleArgs = {
  title: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['ISO8601DateTime'];
  deadline?: Maybe<Scalars['ISO8601DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of UpdateCategory */
export type UpdateCategoryInput = {
  category?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** Autogenerated return type of UpdateCategory */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  category: Category;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateTodo */
export type UpdateTodoInput = {
  categories?: Maybe<Array<Scalars['Int']>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateTodo */
export type UpdateTodoPayload = {
  __typename?: 'UpdateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  todo: Todo;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'category'>
  )>> }
);

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo?: Maybe<(
    { __typename?: 'DeleteTodoPayload' }
    & Pick<DeleteTodoPayload, 'deletedId'>
  )> }
);

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = (
  { __typename?: 'Query' }
  & { todos?: Maybe<Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'deadline'>
    & { categories?: Maybe<Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'category'>
    )>> }
  )>> }
);

export type GetTodosByCategoryIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTodosByCategoryIdQuery = (
  { __typename?: 'Query' }
  & { todosByCategoryIds?: Maybe<Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'deadline'>
    & { categories?: Maybe<Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'category'>
    )>> }
  )>> }
);


export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    id
    category
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: Int!) {
  deleteTodo(input: {id: $id}) {
    deletedId
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const GetTodosDocument = gql`
    query getTodos {
  todos {
    id
    title
    description
    deadline
    categories {
      id
      category
    }
  }
}
    `;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export const GetTodosByCategoryIdDocument = gql`
    query getTodosByCategoryId($id: Int!) {
  todosByCategoryIds(categoryIds: [$id]) {
    id
    title
    description
    deadline
    categories {
      id
      category
    }
  }
}
    `;

/**
 * __useGetTodosByCategoryIdQuery__
 *
 * To run a query within a React component, call `useGetTodosByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosByCategoryIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTodosByCategoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetTodosByCategoryIdQuery, GetTodosByCategoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosByCategoryIdQuery, GetTodosByCategoryIdQueryVariables>(GetTodosByCategoryIdDocument, options);
      }
export function useGetTodosByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosByCategoryIdQuery, GetTodosByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosByCategoryIdQuery, GetTodosByCategoryIdQueryVariables>(GetTodosByCategoryIdDocument, options);
        }
export type GetTodosByCategoryIdQueryHookResult = ReturnType<typeof useGetTodosByCategoryIdQuery>;
export type GetTodosByCategoryIdLazyQueryHookResult = ReturnType<typeof useGetTodosByCategoryIdLazyQuery>;
export type GetTodosByCategoryIdQueryResult = Apollo.QueryResult<GetTodosByCategoryIdQuery, GetTodosByCategoryIdQueryVariables>;