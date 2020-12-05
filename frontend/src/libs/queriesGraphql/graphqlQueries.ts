import { gql } from '@apollo/client';

export const QUERY_GET_USER_POSTS = gql`
  query Posts($id: ID!) {
    getUserPosts(id: $id) {
      id
      title
      content
      image
      image_url
      user_id
    }
  }
`;

export const QUERY_GET_POST = gql`
  query Post($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      user_id
      image
    }
  }
`;
