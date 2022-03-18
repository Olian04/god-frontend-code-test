import "public/css/styles.css";
import React from "react";
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
    );
};

export default App;

