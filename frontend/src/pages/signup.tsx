import { useRef, useCallback, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Flex,
  Link,
  Button,
  Text,
  useToast,
  Heading,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { gql } from '@apollo/client';

import { useMutation } from '@/hooks/useMutation';
import { useValidateForm } from '@/hooks/useValidateForm';
import { SignUpData } from '@/types/mutationsData';
import { SignUpVariables } from '@/types/mutationsVariables';

import Input from '@/components/Input';

const MUTATION = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

export default function SignUp() {
  const formRef = useRef<FormHandles>(null);

  const { mutation, loading, error, data } = useMutation<
    SignUpData,
    SignUpVariables
  >(MUTATION);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      formRef.current.reset();

      toast({
        title: 'Conta criada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [data]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
      .required('Campo obrigatório'),
  });

  const onSuccess = useCallback(async (formData: SignUpVariables): Promise<
    void
  > => {
    mutation({ variables: formData });
  }, []);

  const { handleSubmit } = useValidateForm<SignUpVariables>({
    formRef,
    schema,
    onSuccess,
  });

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr 480px 1fr"
      templateRows="1fr 380px 1fr"
      templateAreas="
        '. . .'
        '. form .'
        '. . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        gridArea="form"
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={16}
      >
        <Heading as="h1" fontSize={28} textAlign="center" marginBottom={8}>
          Criar conta
        </Heading>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            fontSize="sm"
            placeholder="Nome"
          />

          <Input
            type="email"
            name="email"
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            fontSize="sm"
            placeholder="E-mail"
            marginTop={2}
          />

          <Input
            name="password"
            type="password"
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            fontSize="sm"
            placeholder="Senha"
            marginTop={2}
          />

          <Input
            name="passwordConfirmation"
            type="password"
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            fontSize="sm"
            placeholder="Confirmar senha"
            marginTop={2}
          />

          <Button
            type="submit"
            marginTop={6}
            backgroundColor="purple.500"
            height="50px"
            width="100%"
            borderRadius="sm"
            textTransform="uppercase"
            _hover={{
              backgroundColor: 'purple.600',
            }}
          >
            {loading ? '...' : 'Criar'}
          </Button>
        </Form>

        <Text textAlign="center" fontSize="sm" color="gray.300" marginTop={6}>
          <NextLink href="/">
            <Link
              alignSelf="flex-start"
              marginTop={1}
              fontSize="sm"
              color="purple.600"
              fontWeight="bold"
              _hover={{
                color: 'purple.500',
              }}
            >
              Acessar conta
            </Link>
          </NextLink>
        </Text>
      </Flex>
    </Grid>
  );
}
