import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

export const makeClient = () => {
  const link = createHttpLink({
    uri: 'https://graphqlzero.almansi.me/api',
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: link as any,
    cache,
  });

  return client;
};
