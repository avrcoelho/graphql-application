import { ApolloProvider } from '@apollo/client';

import ThemeContainer from '@/contexts/theme/ThemeContainer';
import client from '@/libs/apollo-client';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeContainer>
        <Component {...pageProps} />
      </ThemeContainer>
    </ApolloProvider>
  );
}

export default MyApp;
