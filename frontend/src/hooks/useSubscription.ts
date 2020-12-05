import { useMemo } from 'react';
import { useSubscription as useSubscriptionApollo } from '@apollo/client';

import { SubscriptionData } from '../types/subscriptionsData';

export const useSubscription = <Data = any, Variables = any>({
  query,
  variables,
}: SubscriptionData<Variables>) => {
  const { data, loading, error } = useSubscriptionApollo<Data, Variables>(
    query,
    {
      variables,
    },
  );

  const payload = useMemo(() => {
    return { loading, error, data };
  }, [data, loading, error]);

  return payload;
};
