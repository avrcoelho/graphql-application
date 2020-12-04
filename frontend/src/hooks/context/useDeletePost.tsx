import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { ApolloCache } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

import { QUERY_GET_USER_POSTS } from '@/contants/graphqlQueries';
import { MUTATION_DELETE_POST } from '@/contants/graphqlMutations';
import { useMutation } from '@/hooks/useMutation';
import { DeletePostData as DeletePostDataMutation } from '@/types/mutationsData';
import { UserPostsData } from '@/types/queriesData';
import { DeletePostVariables } from '@/types/mutationsVariables';

interface DeletePostData {
  setOpenAlertConfirmation: (func: any) => any;
  handleDelete: (id: string) => void;
  deleteConfirmed: () => void;
}

const DeletePost = createContext<DeletePostData>({} as DeletePostData);

export const DeletePostProvider: React.FC = ({ children }) => {
  const [postId, setPostId] = useState<null | string>(null);
  const alertConfirmationRef = useRef(null);

  const updateCache = useCallback(
    (cache: ApolloCache<unknown>) => {
      const data = cache.readQuery<UserPostsData>({
        query: QUERY_GET_USER_POSTS,
      });

      const newPosts = data.getUserPosts.filter(({ id }) => id !== postId);

      cache.writeQuery({
        query: QUERY_GET_USER_POSTS,
        data: {
          getUserPosts: newPosts,
        },
      });
    },
    [postId],
  );

  const { mutation, error, data } = useMutation<
    DeletePostDataMutation,
    DeletePostVariables
  >({ query: MUTATION_DELETE_POST, update: updateCache });

  const toast = useToast();

  useEffect(() => {
    if (data) {
      toast({
        title: 'Postagem excluída',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao excluir postagem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const setOpenAlertConfirmation = useCallback((func: Function) => {
    alertConfirmationRef.current = func;
  }, []);

  const handleDelete = useCallback((id: string) => {
    setPostId(id);

    alertConfirmationRef.current();
  }, []);

  const deleteConfirmed = useCallback(() => {
    mutation({ variables: { id: postId } });
  }, [mutation, postId]);

  return (
    <DeletePost.Provider
      value={{ setOpenAlertConfirmation, handleDelete, deleteConfirmed }}
    >
      {children}
    </DeletePost.Provider>
  );
};

export function useDeletePost(): DeletePostData {
  const context = useContext(DeletePost);

  return context;
}
