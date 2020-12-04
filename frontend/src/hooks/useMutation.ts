import { useMemo } from 'react';
import { useMutation as useMutationApollo } from '@apollo/client';

import { MutationData } from '@/types/mutationsData';

export const useMutation = <Data = any, Variables = any>({
  query,
  update,
}: MutationData) => {
  const [mutation, { data, loading, error }] = useMutationApollo<
    Data,
    Variables
  >(query, {
    onError: error => error,
    update,
  });

  const payload = useMemo(() => {
    return { mutation, loading, error, data };
  }, [mutation, data, loading, error]);

  return payload;
};
