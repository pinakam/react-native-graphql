import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ALBUMS_LIST, SAVE_ALBUM} from './gql/albums';
import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';

const AlbumItem = (album: any) => {
  return (
    <View style={albumStyle.itemView}>
      <Text style={albumStyle.itemText}>{album.album.title}</Text>
      <View>
        <FlatList
          horizontal
          data={album.album.photos.data}
          renderItem={({item}) => <PhotoItem photo={item} />} // Use item.item to access the data
          keyExtractor={item => item.id.toString()} // Provide a unique key extractor
        />
      </View>
    </View>
  );
};

const PhotoItem = (photo: any) => {
  return (
    <Image
      source={{uri: photo.photo.url}}
      alt="test"
      style={albumStyle.itemPhoto}
    />
  );
};

const Albums = () => {
  let {data, loading, error} = useQuery(ALBUMS_LIST);
  const [createAlbum] = useMutation(SAVE_ALBUM);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [albumTitle, setAlbumTitle] = useState<string>('');

  const submitAlbum = async () => {
    try {
      console.log('Handling create post...');

      await createAlbum({
        variables: {
          input: {
            title: albumTitle,
            userId: 1,
          },
        },
      });
      setAlbumTitle('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (error) {
    return <View>Something went wrong: {error}</View>;
  } else {
    return (
      <View style={albumStyle.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={albumStyle.container}>
            <View style={albumStyle.modalView}>
              <Text style={albumStyle.modalText}>Title!</Text>
              <TextInput
                style={albumStyle.titleInput}
                value={albumTitle}
                onChangeText={setAlbumTitle}
              />
              <TouchableOpacity
                style={albumStyle.saveButton}
                onPress={submitAlbum}>
                <Text style={albumStyle.saveText}>Add Album</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={albumStyle.saveButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={albumStyle.saveText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {loading || !data ? (
          <View style={albumStyle.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          data && (
            <View>
              <TouchableOpacity
                style={albumStyle.addButton}
                onPress={() => setModalVisible(true)}>
                <Text style={albumStyle.addButtonText}>Add Album</Text>
              </TouchableOpacity>
              <FlatList
                data={data.albums.data}
                renderItem={({item}) => <AlbumItem album={item} />} // Use item.item to access the data
                keyExtractor={item => item.id.toString()} // Provide a unique key extractor
              />
            </View>
          )
        )}
      </View>
    );
  }
};

export default Albums;

const albumStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    margin: 10,
  },
  itemText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemView: {
    padding: 10,
    borderWidth: 2,
    backgroundColor: 'rgb(219, 222, 224)',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#998833',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: '#000000',
  },
  titleInput: {
    borderRadius: 20,
    borderWidth: 2,
    width: '100%',
    padding: 20,
    color: '#000000',
    fontSize: 23,
  },
  saveButton: {
    backgroundColor: '#0d6efd',
    marginTop: 50,
    padding: 20,
    borderRadius: 20,
  },
  saveText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
