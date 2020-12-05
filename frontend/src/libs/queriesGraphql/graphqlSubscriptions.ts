import { gql } from '@apollo/client';

export const SUBSCRIPTION_ADD_POST = gql`
  subscription OnPostAdded($userId: ID!) {
    postAdded(user_id: $userId) {
      id
    }
  }
`;

export const SUBSCRIPTION_UPDATE_POST = gql`
  subscription OnPostUpdated($userId: ID!) {
    postUpdated(user_id: $userId) {
      id
    }
  }
`;

export const SUBSCRIPTION_DELETE_POST = gql`
  subscription OnPostDelected($userId: ID!) {
    postDelected(user_id: $userId) {
      id
    }
  }
`;
