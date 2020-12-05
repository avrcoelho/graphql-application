import { ApolloProvider } from '@apollo/client';

import ThemeContainer from '@/contexts/theme/ThemeContainer';
import client from '@/libs/apollo-client';
import ContextProvider from '@/hooks/context';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeContainer>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeContainer>
    </ApolloProvider>
  );
}

export default MyApp;
