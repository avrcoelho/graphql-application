import { ApolloProvider } from '@apollo/client';

import ThemeContainer from '@/contexts/theme/ThemeContainer';
import client from '@/libs/apollo-client';
import { DeletePostProvider } from '@/hooks/context/useDeletePost';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <DeletePostProvider>
        <ThemeContainer>
          <Component {...pageProps} />
        </ThemeContainer>
      </DeletePostProvider>
    </ApolloProvider>
  );
}

export default MyApp;
