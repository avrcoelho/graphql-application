import { useMemo } from 'react';
import { useLazyQuery as useLazyQueryApollo } from '@apollo/client';

import { QueryData } from '../types/queriesData';

export const useLazyQuery = <Data = any, Variables = any>({
  query,
}: QueryData<Variables>) => {
  const [getData, { loading, data, error }] = useLazyQueryApollo<
    Data,
    Variables
  >(query, {
    onError: error => error,
  });

  const payload = useMemo(() => {
    return { getData, loading, error, data };
  }, [getData, data, loading, error]);

  return payload;
};
