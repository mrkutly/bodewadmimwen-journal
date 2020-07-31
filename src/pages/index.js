import React from 'react';
import { createGlobalStyles, directions, ThemeProvider } from 'waskode';
import WordForm from '../components/WordForm';

const GlobalStyle = createGlobalStyles(directions);

const Index = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={directions}>
      <WordForm />
    </ThemeProvider>
  </>
);

export default Index;
