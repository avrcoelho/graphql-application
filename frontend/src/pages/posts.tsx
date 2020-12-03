import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Flex, useToast, Heading, Text } from '@chakra-ui/react';
import { gql } from '@apollo/client';

import { useQuery } from '@/hooks/useQuery';
import { UserPostsData } from '@/types/queriesData';
import Post from '@/components/Post';
import ButtonAddPost from '@/components/ButtonAddPost';
import AlertConfirmation, {
  AlertConfirmationHandles,
} from '@/components/AlertConfirmation';
import { useDeletePost } from '@/hooks/context/useDeletePost';

const QUERY = gql`
  query Posts {
    getUserPosts(id: "5fa0a34e8464d50798ef407f") {
      id
      title
      content
      image
      image_url
      user_id
    }
  }
`;

export default function Posts() {
  const alertConfirmationRef = useRef<AlertConfirmationHandles>(null);

  const { data, loading, error } = useQuery<UserPostsData>(QUERY);
  const toast = useToast();
  const { deleteFn } = useDeletePost();

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

  useEffect(() => {
    deleteFn(handleDelete);
  }, [deleteFn]);

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

      <ButtonAddPost />

      <AlertConfirmation ref={alertConfirmationRef} />
    </>
  );
}
