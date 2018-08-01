import {execute, makePromise, DocumentNode, ApolloLink, concat} from 'apollo-link';
import {GraphQLError} from 'graphql';
import { HttpLink } from 'apollo-link-http';

export enum ApplicationGraphQLErrorType {
  BadRequest = "BadRequest",
  InternalServerError = "InternalServerError"
}
export interface ApplicationGraphQLError {
  locations?:{line: number, column: number}[]
  message: string
  type: ApplicationGraphQLErrorType
}

export interface GraphqlResult<Data> {
  data?: Data;
  extensions?: { [key: string]: any };
  errors?: ApplicationGraphQLError[];
}

function applicationGraphQLError(error: GraphQLError & {type: ApplicationGraphQLErrorType}): ApplicationGraphQLError {
  return error;
}



const setAuthTokenMiddleware = new ApolloLink((operation, forward) => {
  console.log(operation)
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });
  
  if (forward) { 
    return forward(operation);
  } else {
    throw new Error("forward is undefined");
  }
});

export function executeGraphql<Variables, ResultData>(documentNode: DocumentNode, variables: Variables): Promise<GraphqlResult<ResultData>| void> {
  const operation = {
    query: documentNode,
    variables
  };

  const defaultLink = new HttpLink({uri: "/api/graphql"})

  return makePromise(execute(
    concat(setAuthTokenMiddleware, defaultLink),
    operation
  ))
  .then((response) => {
    if (response) {
      return response as GraphqlResult<ResultData>;
    }
  })
  .catch(failResult => {
    if (failResult.result) {
      if (failResult.result.errors) {
        failResult.result.errors = failResult.result.errors.map(applicationGraphQLError)
      }
    }
    throw failResult;
  });
}