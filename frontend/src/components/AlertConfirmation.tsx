import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
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

  const { deleteConfirmed } = useDeletePost();

  const handleToggole = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleDelete = useCallback(() => {
    deleteConfirmed();

    setIsOpen(prevState => !prevState);
  }, [deleteConfirmed]);

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
