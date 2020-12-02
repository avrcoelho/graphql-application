import { Box, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function PostActions() {
  return (
    <Box>
      <Button marginRight={2}>
        <EditIcon />
      </Button>
      <Button
        backgroundColor="red.500"
        _hover={{
          backgroundColor: 'red.600',
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
}
