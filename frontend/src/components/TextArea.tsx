import { useEffect, useRef, memo, FC } from 'react';
import {
  Textarea as ChakraTextarea,
  Box,
  Text,
  TextareaProps,
} from '@chakra-ui/react';
import { useField } from '@unform/core';

const TextArea: FC<TextareaProps> = ({ name, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: textareaRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <Box>
      <ChakraTextarea ref={textareaRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <Text fontSize={12} marginLeft={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};
export default memo(TextArea);
