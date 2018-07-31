import ApolloClient, { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

const operation = {
  query: gql`query { hello }`,
};

execute(new HttpLink({uri: "/api"}), operation);
