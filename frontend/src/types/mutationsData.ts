import { DocumentNode } from 'graphql';
import { MutationUpdaterFn } from '@apollo/client';

import { Post } from './queriesData';

export interface SignUpData {
  id: string;
  name: string;
  email: string;
}

export interface DeletePostData {
  id: string;
}

export interface DeletePostData {
  id: string;
}

export interface SessionData {
  token: string;
  id: string;
}

export interface CreatePostData {
  data: { createPost: Post };
}

export interface MutationData {
  query: DocumentNode;
  update?: MutationUpdaterFn;
}
