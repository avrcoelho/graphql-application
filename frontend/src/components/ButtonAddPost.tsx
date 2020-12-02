import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function ButtonAddPost() {
  return (
    <Button
      position="fixed"
      bottom={10}
      right={10}
      rounded={50}
      backgroundColor="purple.500"
      height={14}
      width={14}
      _hover={{
        backgroundColor: 'purple.600',
      }}
    >
      <AddIcon />
    </Button>
  );
}
