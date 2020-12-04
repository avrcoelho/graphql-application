import { gql } from '@apollo/client';

export const QUERY_GET_USER_POSTS = gql`
  query Posts {
    getUserPosts(id: "5fc596202d54e50fefafeda8") {
      id
      title
      content
      image
      image_url
      user_id
    }
  }
`;
