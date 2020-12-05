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

import { useToast } from '@chakra-ui/react';

import { MUTATION_DELETE_POST } from '@/libs/queriesGraphql/graphqlMutations';

import { useMutation } from '@/hooks/useMutation';
import { useDeletePost } from '@/hooks/context/useDeletePost';

import { DeletePostData as DeletePostDataMutation } from '@/types/mutationsData';

import { DeletePostVariables } from '@/types/mutationsVariables';

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

  const { mutation, error, data } = useMutation<
    DeletePostDataMutation,
    DeletePostVariables
  >({ query: MUTATION_DELETE_POST });

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
