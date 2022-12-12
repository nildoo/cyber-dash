/* eslint-disable */
import { ApolloClient, ApolloError, createHttpLink, from, InMemoryCache, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import { useAuth } from '../hooks/useAuth';

const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/graphql',
  uri: 'https://cyber-server-app.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
