import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react';

import { Post as PostProps } from '@/types/queriesData';
import PostActions from './PostActions';

export default function Post(post: PostProps) {
  return (
    <Box
      as="article"
      borderRadius={4}
      border="solid 1px #232b3c"
      paddingX={6}
      paddingY={4}
      marginBottom={8}
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Heading as="h3" fontSize={18}>
          {post.title}
        </Heading>

        <PostActions />
      </Flex>

      {post.image_url && <Image src={post.image_url} width={300} marginY={6} />}

      <Text fontSize={14}>{post.content}</Text>
    </Box>
  );
}
