import React from 'react';
import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

const theme = extendTheme({});

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{ initialColorMode: 'dark' }}>
        <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default ThemeContainer;
