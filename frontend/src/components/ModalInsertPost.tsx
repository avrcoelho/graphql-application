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
import { ApolloCache } from '@apollo/client';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useValidateForm } from '@/hooks/useValidateForm';
import { useMutation } from '@/hooks/useMutation';

import { CreatePostVariables } from '@/types/mutationsVariables';
import { CreatePostData } from '@/types/mutationsData';
import { Post, UserPostsData } from '@/types/queriesData';

import { MUTATION_CREATE_POST } from '@/contants/graphqlMutations';
import { QUERY_GET_USER_POSTS } from '@/contants/graphqlQueries';

import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

export interface ModalInsertPostHandles {
  handleOpen: () => void;
}

const ModalInsertPost: ForwardRefRenderFunction<ModalInsertPostHandles> = (
  _,
  ref,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = useRef();
  const finalRef = useRef();
  const formRef = useRef<FormHandles>(null);

  const updateCache = useCallback(
    (cache: ApolloCache<unknown>, { data: responseData }: CreatePostData) => {
      const cacheData = cache.readQuery<UserPostsData>({
        query: QUERY_GET_USER_POSTS,
      });

      cache.writeQuery({
        query: QUERY_GET_USER_POSTS,
        data: {
          getUserPosts: [responseData.createPost, ...cacheData.getUserPosts],
        },
      });
    },
    [],
  );

  const { mutation, data, loading, error } = useMutation<
    Post,
    CreatePostVariables
  >({
    query: MUTATION_CREATE_POST,
    update: updateCache,
  });

  useEffect(() => {
    if (data) {
      toast({
        title: 'Postagem criada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    }
  }, [data, onClose]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao criar postagem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  useImperativeHandle(ref, () => {
    return {
      handleOpen: onOpen,
    };
  });

  const schema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório'),
    content: Yup.string().required('Campo obrigatório'),
  });

  const onSuccess = useCallback(async (formData: CreatePostVariables): Promise<
    void
  > => {
    mutation({ variables: formData });
  }, []);

  const { handleSubmit } = useValidateForm<CreatePostVariables>({
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
        onClose={!loading ? onClose : null}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova postagem</ModalHeader>
          <ModalCloseButton disabled={!!loading} />
          <ModalBody pb={6}>
            <Form ref={formRef} onSubmit={handleSubmit}>
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
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} disabled={!!loading}>
              Cancelar
            </Button>
            <Button
              isLoading={loading}
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

export default forwardRef(ModalInsertPost);
