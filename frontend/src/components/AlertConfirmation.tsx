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

interface Props {
  id: string;
}

export interface AlertConfirmationHandles {
  handleToggole: () => void;
}

const AlertConfirmation: ForwardRefRenderFunction<AlertConfirmationHandles> = (
  props,
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = useRef();

  const handleToggole = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

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
            <Button colorScheme="red" onClick={handleToggole} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default forwardRef(AlertConfirmation);
