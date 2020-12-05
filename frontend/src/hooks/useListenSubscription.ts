import { useCallback, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { UserPostsData } from '@/types/queriesData';
import {
  PostDelectedData,
  PostAddedData,
  PostUpdatedData,
} from '@/types/subscriptionsData';
import { useSubscription } from './useSubscription';

import {
  SUBSCRIPTION_ADD_POST,
  SUBSCRIPTION_DELETE_POST,
  SUBSCRIPTION_UPDATE_POST,
} from '@/libs/queriesGraphql/graphqlSubscriptions';
import { QUERY_GET_USER_POSTS } from '@/libs/queriesGraphql/graphqlQueries';

export function useListenSubscription(userId: string) {
  const client = useApolloClient();

  const { data: postAddedData } = useSubscription<PostAddedData>({
    query: SUBSCRIPTION_ADD_POST,
    variables: { userId },
  });

  const { data: postUpdatedData } = useSubscription<PostUpdatedData>({
    query: SUBSCRIPTION_UPDATE_POST,
    variables: { userId },
  });

  const { data: postDelectedData } = useSubscription<PostDelectedData>({
    query: SUBSCRIPTION_DELETE_POST,
    variables: { userId },
  });

  const updateCacheAfterDelected = useCallback(() => {
    const data = client.cache.readQuery<UserPostsData>({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },
    });

    const newPosts = data.getUserPosts.filter(
      ({ id }) => id !== postDelectedData.postDelected.id,
    );

    client.cache.writeQuery({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },

      data: {
        getUserPosts: newPosts,
      },
    });
  }, [postDelectedData, client]);

  const updateCacheAfterAdded = useCallback(() => {
    const cacheData = client.cache.readQuery<UserPostsData>({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },
    });

    client.cache.writeQuery({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },
      data: {
        getUserPosts: [postAddedData.postAdded, ...cacheData.getUserPosts],
      },
    });
  }, [userId, postAddedData]);

  const updateCacheAfterUpdated = useCallback(() => {
    const cacheData = client.cache.readQuery<UserPostsData>({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },
    });

    client.cache.writeQuery({
      query: QUERY_GET_USER_POSTS,
      variables: { id: userId },
      data: {
        getUserPosts: cacheData.getUserPosts.map(post =>
          post.id === postUpdatedData.postUpdated.id
            ? { ...postUpdatedData.postUpdated }
            : post,
        ),
      },
    });
  }, [userId, postUpdatedData]);

  useEffect(() => {
    if (postAddedData) {
      updateCacheAfterAdded();
    }
  }, [postAddedData]);

  useEffect(() => {
    if (postUpdatedData) {
      updateCacheAfterUpdated();
    }
  }, [postUpdatedData]);

  useEffect(() => {
    if (postDelectedData) {
      updateCacheAfterDelected();
    }
  }, [postDelectedData]);
}
