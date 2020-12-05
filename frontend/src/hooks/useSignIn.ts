import { useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { SessionData } from '@/types/mutationsData';
import { SessionVariables } from '@/types/mutationsVariables';
import { MUTATION_SIGNIN } from '@/libs/queriesGraphql/graphqlMutations';

import { useMutation } from './useMutation';

export const useSignIn = () => {
  const { mutation: signIn, data, loading, error } = useMutation<
    SessionData,
    SessionVariables
  >({ query: MUTATION_SIGNIN });

  const router = useRouter();

  useEffect(() => {
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));

      router.push('/posts');
    }
  }, [data, router]);

  const getUserId = useCallback(() => {
    const userData =
      typeof window !== 'undefined' && localStorage.getItem('userData');

    if (userData) {
      const id = JSON.parse(userData).auth.id;

      return id;
    }

    return '';
  }, []);

  const payload = useMemo(() => {
    return { signIn, loading, error, getUserId };
  }, [signIn, loading, error, getUserId]);

  return payload;
};
