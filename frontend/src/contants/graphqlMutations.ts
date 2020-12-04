import { gql } from '@apollo/client';

export const MUTATION_CREATE_POST = gql`
  # Write your query or mutation here
  mutation CreatePost($title: String!, $content: String!) {
    createPost(data: { title: $title, content: $content }) {
      content
      title
      id
      image
      image_url
      user_id
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const MUTATION_CREATE_USER = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

export const MUTATION_SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    auth(data: { email: $email, password: $password }) {
      id
      token
    }
  }
`;
