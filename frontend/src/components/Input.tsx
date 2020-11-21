import { useEffect, useRef, memo, FC } from 'react';
import { Input as ChakraInput, Box, Text } from '@chakra-ui/react';
import { useField } from '@unform/core';

import { InputProps } from '@/types/input';

const Input: FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <Box>
      <ChakraInput ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <Text fontSize={12} marginLeft={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};
export default memo(Input);
