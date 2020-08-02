/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const React = require('react');
const { createGlobalStyles, directions, ThemeProvider } = require('waskode');
const Layout = require('./src/components/Layout.tsx').default;

require('./src/global.css');

const GlobalStyle = createGlobalStyles(directions);

exports.wrapRootElement = ({ element }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={directions}>{element}</ThemeProvider>
  </>
);
