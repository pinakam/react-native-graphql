import {gql} from '@apollo/client';

export const USER_LIST = gql(`
  {
    users {
      id
      name
      email
      todos {
        id
        description
        done
      }
    }
  }
`);
