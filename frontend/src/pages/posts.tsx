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

import { useQuery } from '@/hooks/useQuery';
import { useDeletePost } from '@/hooks/context/useDeletePost';

import { UserPostsData } from '@/types/queriesData';
import { QUERY_GET_USER_POSTS } from '@/contants/graphqlQueries';

export default function Posts() {
  const alertConfirmationRef = useRef<AlertConfirmationHandles>(null);
  const modalInsertPostRef = useRef<ModalInsertPostHandles>(null);

  const { data, loading, error } = useQuery<UserPostsData>(
    QUERY_GET_USER_POSTS,
  );
  const toast = useToast();
  const { setOpenAlertConfirmation } = useDeletePost();

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

  const handleInsertPost = useCallback(() => {
    modalInsertPostRef.current.handleOpen();
  }, []);

  useEffect(() => {
    setOpenAlertConfirmation(handleDelete);
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
    </>
  );
}
