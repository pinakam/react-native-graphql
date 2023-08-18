import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {USER_LIST} from './gql/users';

const Users = () => {
  const UserItem = ({user}: any) => {
    return (
      <Pressable>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </Pressable>
    );
  };

  const {data, loading, error} = useQuery(USER_LIST);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data.users}
          renderItem={({item}) => <UserItem user={item} />} // Use item.item to access the data
          keyExtractor={item => item.id.toString()} // Provide a unique key extractor
        />
      )}
    </ScrollView>
  );
};

export default Users;
