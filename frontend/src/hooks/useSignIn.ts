import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionData } from '@/types/mutationsData';
import { SessionVariables } from '@/types/mutationsVariables';
import { MUTATION_SIGNIN } from '@/contants/graphqlMutations';

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
  }, [data]);

  const payload = useMemo(() => {
    return { signIn, loading, error };
  }, [signIn, loading, error]);

  return payload;
};
