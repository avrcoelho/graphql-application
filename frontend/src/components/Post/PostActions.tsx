import { Box, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useDeletePost } from '@/hooks/context/useDeletePost';
import { useUpdatePost } from '@/hooks/context/useUpdatePost';

interface Props {
  postId: string;
}

export default function PostActions({ postId }: Props) {
  const { handleDelete } = useDeletePost();
  const { handleUpdate } = useUpdatePost();

  return (
    <>
      <Box>
        <Button marginRight={2} onClick={() => handleUpdate(postId)}>
          <EditIcon />
        </Button>
        <Button
          onClick={() => handleDelete(postId)}
          backgroundColor="red.500"
          _hover={{
            backgroundColor: 'red.600',
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </>
  );
}
