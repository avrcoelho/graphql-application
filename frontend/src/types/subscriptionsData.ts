import { DocumentNode } from '@apollo/client';
import { Post } from './queriesData';

export interface PostAddedData {
  postAdded: Post;
}

export interface PostUpdatedData {
  postUpdated: Post;
}

export interface PostDelectedData {
  postDelected: Pick<Post, 'id'>;
}

export interface SubscriptionData<Ivariables> {
  query: DocumentNode;
  variables?: Ivariables;
}
