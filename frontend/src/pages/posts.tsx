import React, { useEffect } from 'react';
import { Grid, Flex, useToast, Heading, Text } from '@chakra-ui/react';
import { gql } from '@apollo/client';

import { useQuery } from '@/hooks/useQuery';
import { UserPostsData } from '@/types/queriesData';
import Post from '@/components/Post';
import ButtonAddPost from '@/components/ButtonAddPost';

const QUERY = gql`
  query Posts {
    getUserPosts(id: "5fa0a34e8464d50798ef407f") {
      id
      title
      content
      image
      user_id
    }
  }
`;

export default function Posts() {
  const { data, loading, error } = useQuery<UserPostsData>(QUERY);
  const toast = useToast();

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
    </>
  );
}
