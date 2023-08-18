import React from 'react';
import {ApolloClient, InMemoryCache, useQuery} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';
import {USER_LIST} from './src/gql/users';
import {FlatList, Pressable, ScrollView, Text, View} from 'react-native';
import {loadDevMessages, loadErrorMessages} from '@apollo/client/dev';
import {makeClient} from './src/apolo/makeClient';
import Users from './src/users';
import Albums from "./src/albums";

const App = (): JSX.Element => {
  if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }
  let [client, setClient] = React.useState(makeClient());

  return (
    <ApolloProvider client={client}>
      <Albums />
    </ApolloProvider>
  );
};

export default App;
