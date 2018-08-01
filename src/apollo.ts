import {execute, makePromise, DocumentNode} from 'apollo-link';
import {GraphQLError} from 'graphql';
import { HttpLink } from 'apollo-link-http';

export interface ExecutionResult<Data> {
  data?: Data;
  extensions?: { [key: string]: any };
  errors?: GraphQLError[];
}

export function executeQuery<V, R>(query: DocumentNode, variables: V) {
  const operation = {
    query,
    variables
  };

  return makePromise(execute(
    new HttpLink({uri: "/api/graphql"}),
    operation
  ))
}