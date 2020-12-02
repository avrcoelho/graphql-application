import { useMemo } from 'react';
import { useQuery as useQueryApollo } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const useQuery = <Data = any, Variables = any>(QUERY: DocumentNode) => {
  const { data, loading, error } = useQueryApollo<Data, Variables>(QUERY, {
    onError: error => error,
  });

  const payload = useMemo(() => {
    return { loading, error, data };
  }, [data, loading, error]);

  return payload;
};
