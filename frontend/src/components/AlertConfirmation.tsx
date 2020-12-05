import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
} from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { ApolloCache } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

import { QUERY_GET_USER_POSTS } from '@/contants/graphqlQueries';
import { MUTATION_DELETE_POST } from '@/contants/graphqlMutations';
import { useMutation } from '@/hooks/useMutation';
import { DeletePostData as DeletePostDataMutation } from '@/types/mutationsData';
import { UserPostsData } from '@/types/queriesData';
import { DeletePostVariables } from '@/types/mutationsVariables';

import { useDeletePost } from '@/hooks/context/useDeletePost';

export interface AlertConfirmationHandles {
  handleToggole: () => void;
}

const AlertConfirmation: ForwardRefRenderFunction<AlertConfirmationHandles> = (
  _,
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = useRef();

  const { postId, setPostId } = useDeletePost();

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

      setPostId(null);
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

      setPostId(null);
    }
  }, [error]);

  const handleToggole = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleDelete = useCallback(() => {
    mutation({ variables: { id: postId } });

    setIsOpen(prevState => !prevState);
  }, [mutation, postId]);

  useImperativeHandle(ref, () => {
    return {
      handleToggole,
    };
  });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={handleToggole}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Postagem
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir a postagem?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleToggole}>
              Cancelar
            </Button>
            <Button
              backgroundColor="red.500"
              _hover={{
                backgroundColor: 'red.600',
              }}
              onClick={handleDelete}
              ml={3}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default forwardRef(AlertConfirmation);
