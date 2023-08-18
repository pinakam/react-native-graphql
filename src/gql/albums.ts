import {gql} from '@apollo/client';

export const ALBUMS_LIST = gql`
  query {
    albums {
      data {
        id
        title
        photos {
          data {
            id
            title
            url
            thumbnailUrl
          }
        }
      }
    }
  }
`;

export const SAVE_ALBUM = gql`
  mutation ($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      title
    }
  }
`;
