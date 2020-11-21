import { InputProps as ChaKraInputProps } from '@chakra-ui/react';

interface Props {
  name: string;
}

export type InputProps = ChaKraInputProps & Props;
