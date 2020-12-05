import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useValidateForm } from '@/hooks/useValidateForm';
import { useMutation } from '@/hooks/useMutation';
import { useLazyQuery } from '@/hooks/useLazyQuery';
import { useUpdatePost } from '@/hooks/context/useUpdatePost';

import { UpdatePostVariables } from '@/types/mutationsVariables';
import { GetPostVariables } from '@/types/queriesVariables';
import { Post, GetPostsData } from '@/types/queriesData';

import { MUTATION_UPDATE_POST } from '@/libs/queriesGraphql/graphqlMutations';
import { QUERY_GET_POST } from '@/libs/queriesGraphql/graphqlQueries';

import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

export interface ModalUpdatePostHandles {
  handleOpen: () => void;
}

const ModalUpdatePost: ForwardRefRenderFunction<ModalUpdatePostHandles> = (
  _,
  ref,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { postId, setPostId } = useUpdatePost();

  const initialRef = useRef();
  const finalRef = useRef();
  const formRef = useRef<FormHandles>(null);

  const { getData: getPost, loading, data: postData } = useLazyQuery<
    GetPostsData,
    GetPostVariables
  >({ query: QUERY_GET_POST });

  const {
    mutation,
    data: dataMutation,
    loading: loadingMutation,
    error: errorMutation,
  } = useMutation<Post, UpdatePostVariables>({
    query: MUTATION_UPDATE_POST,
  });

  useEffect(() => {
    if (postId && isOpen) {
      getPost({ variables: { id: postId } });
    }
  }, [getPost, postId, isOpen]);

  useEffect(() => {
    if (dataMutation) {
      toast({
        title: 'Postagem atualizada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setPostId(null);

      onClose();
    }
  }, [dataMutation, onClose, setPostId]);

  useEffect(() => {
    if (errorMutation) {
      toast({
        title: 'Erro ao atualizar postagem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      setPostId(null);
    }
  }, [errorMutation, setPostId]);

  useImperativeHandle(ref, () => {
    return {
      handleOpen: onOpen,
    };
  });

  const schema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório'),
    content: Yup.string().required('Campo obrigatório'),
  });

  const onSuccess = useCallback(
    async (formData: UpdatePostVariables): Promise<void> => {
      mutation({ variables: { id: postId, ...formData } });
    },
    [postId],
  );

  const { handleSubmit } = useValidateForm<UpdatePostVariables>({
    formRef,
    schema,
    onSuccess,
  });

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={!loadingMutation ? onClose : null}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar postagem</ModalHeader>
          <ModalCloseButton disabled={!!loadingMutation} />
          <ModalBody pb={6}>
            {!loading && postData?.getPost && (
              <Form
                ref={formRef}
                initialData={postData?.getPost}
                onSubmit={handleSubmit}
              >
                <Input
                  name="title"
                  height="50px"
                  backgroundColor="gray.800"
                  focusBorderColor="purple.500"
                  fontSize="sm"
                  placeholder="Titulo"
                />

                <TextArea
                  name="content"
                  height="50px"
                  backgroundColor="gray.800"
                  focusBorderColor="purple.500"
                  fontSize="sm"
                  placeholder="Conteúdo"
                  marginTop={2}
                />
              </Form>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} disabled={!!loadingMutation}>
              Cancelar
            </Button>
            <Button
              isLoading={loadingMutation}
              onClick={() => formRef.current.submitForm()}
              backgroundColor="purple.500"
              _hover={{
                backgroundColor: 'purple.600',
              }}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default forwardRef(ModalUpdatePost);
