import { ApolloProvider } from '@apollo/client';

import ThemeContainer from '@/contexts/theme/ThemeContainer';
import client from '@/libs/apollo-client';
import { DeletePostProvider } from '@/hooks/context/useDeletePost';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeContainer>
        <DeletePostProvider>
          <Component {...pageProps} />
        </DeletePostProvider>
      </ThemeContainer>
    </ApolloProvider>
  );
}

export default MyApp;
