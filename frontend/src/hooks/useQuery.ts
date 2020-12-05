import { useMemo } from 'react';
import { useQuery as useQueryApollo } from '@apollo/client';

import { QueryData } from '../types/queriesData';

export const useQuery = <Data = any, Variables = any>({
  query,
  variables,
}: QueryData<Variables>) => {
  const { data, loading, error } = useQueryApollo<Data, Variables>(query, {
    variables,
    onError: error => error,
  });

  const payload = useMemo(() => {
    return { loading, error, data };
  }, [data, loading, error]);

  return payload;
};
