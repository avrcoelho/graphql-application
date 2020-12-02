import { useMemo } from 'react';
import {
  MutationUpdaterFn,
  useMutation as useMutationApollo,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

export const useMutation = <Data = any, Variables = any>(
  MUTATION: DocumentNode,
  update?: MutationUpdaterFn,
) => {
  const [mutation, { data, loading, error }] = useMutationApollo<
    Data,
    Variables
  >(MUTATION, {
    onError: error => error,
    update,
  });

  const payload = useMemo(() => {
    return { mutation, loading, error, data };
  }, [mutation, data, loading, error]);

  return payload;
};
