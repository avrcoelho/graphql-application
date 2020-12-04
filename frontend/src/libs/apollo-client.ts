import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const authLink = setContext((_, { headers }) => {
  const userData = localStorage.getItem('userData');

  const token = JSON.parse(userData)?.auth?.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getUserPosts: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
