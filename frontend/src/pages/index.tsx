import { useRef, useCallback, useEffect } from 'react';
import { Grid, Flex, Link, Button, Text, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useSignIn } from '@/hooks/useSignIn';
import { useValidateForm } from '@/hooks/useValidateForm';
import { SessionVariables } from '@/types/session';

import Input from '@/components/Input';

export default function Home() {
  const formRef = useRef<FormHandles>(null);

  const { signIn, loading, error } = useSignIn();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao acessar conta',
        description: 'E-mail ou senha inválidos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const schema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  });

  const onSuccess = useCallback(async (formData: SessionVariables): Promise<
    void
  > => {
    signIn({ variables: formData });
  }, []);

  const { handleSubmit } = useValidateForm<SessionVariables>({
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
        height="100%"
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={16}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            fontSize="sm"
            placeholder="E-mail"
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
            {loading ? '...' : 'Entrar'}
          </Button>
        </Form>

        <Text textAlign="center" fontSize="sm" color="gray.300" marginTop={6}>
          Não tem uma conta?{' '}
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
            Registre-se
          </Link>
        </Text>
      </Flex>
    </Grid>
  );
}
