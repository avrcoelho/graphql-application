import { useMemo, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import { SessionData, SessionVariables } from '@/types/session';

const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    auth(data: { email: $email, password: $password }) {
      id
      token
    }
  }
`;

export const useSignIn = () => {
  const [signIn, { data, loading, error }] = useMutation<
    SessionData,
    SessionVariables
  >(SIGNIN, { onError: error => error });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));

      router.push('/posts');
    }
  }, [data]);

  const payload = useMemo(() => {
    return { signIn, loading, error };
  }, [signIn, loading, error]);

  return payload;
};
