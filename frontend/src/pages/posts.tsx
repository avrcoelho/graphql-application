import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Flex, useToast, Heading, Text } from '@chakra-ui/react';

import Post from '@/components/Post';
import ButtonAddPost from '@/components/ButtonAddPost';
import AlertConfirmation, {
  AlertConfirmationHandles,
} from '@/components/AlertConfirmation';
import ModalInsertPost, {
  ModalInsertPostHandles,
} from '@/components/ModalInsertPost';
import ModalUpdatePost, {
  ModalUpdatePostHandles,
} from '@/components/ModalUpdatePost';

import { useQuery } from '@/hooks/useQuery';
import { useSignIn } from '@/hooks/useSignIn';
import { useListenSubscription } from '@/hooks/useListenSubscription';
import { useDeletePost } from '@/hooks/context/useDeletePost';
import { useUpdatePost } from '@/hooks/context/useUpdatePost';

import { UserPostsData } from '@/types/queriesData';
import { GetPostVariables } from '@/types/queriesVariables';

import { QUERY_GET_USER_POSTS } from '@/libs/queriesGraphql/graphqlQueries';

export default function Posts() {
  const alertConfirmationRef = useRef<AlertConfirmationHandles>(null);
  const modalUpdatePostRef = useRef<ModalUpdatePostHandles>(null);
  const modalInsertPostRef = useRef<ModalInsertPostHandles>(null);

  const { getUserId } = useSignIn();

  const { data, loading, error } = useQuery<UserPostsData, GetPostVariables>({
    query: QUERY_GET_USER_POSTS,
    variables: { id: getUserId() },
  });
  const toast = useToast();
  const { setOpenAlertConfirmation } = useDeletePost();
  const { setOpenUpdateModal } = useUpdatePost();
  useListenSubscription(getUserId());

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao obter os posts',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const handleDelete = useCallback(() => {
    alertConfirmationRef.current.handleToggole();
  }, []);

  const handleUpdate = useCallback(() => {
    modalUpdatePostRef.current.handleOpen();
  }, []);

  const handleInsertPost = useCallback(() => {
    modalInsertPostRef.current.handleOpen();
  }, []);

  useEffect(() => {
    setOpenAlertConfirmation(handleDelete);

    setOpenUpdateModal(handleUpdate);
  }, [setOpenAlertConfirmation]);

  return (
    <>
      <Grid
        as="main"
        height="100vh"
        templateColumns="1fr 780px 1fr"
        templateAreas="
        '. container .'
      "
        justifyContent="center"
      >
        <Flex
          gridArea="container"
          borderRadius="md"
          flexDir="column"
          alignItems="stretch"
          padding={16}
        >
          <Heading as="h1" fontSize={28} textAlign="center" marginBottom={8}>
            Postagens
          </Heading>
          {data?.getUserPosts.map(post => (
            <Post key={post.id} {...post} />
          ))}

          {loading && (
            <Text marginX="auto" textAlign="center">
              Carregando...
            </Text>
          )}
        </Flex>
      </Grid>

      <ButtonAddPost onClick={handleInsertPost} />

      <AlertConfirmation ref={alertConfirmationRef} />

      <ModalInsertPost ref={modalInsertPostRef} />

      <ModalUpdatePost ref={modalUpdatePostRef} />
    </>
  );
}
