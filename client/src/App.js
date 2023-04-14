import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// To be added, components

// To be added, client const

function App() {
  return (
    <ApolloProvider client={client}>

    </ApolloProvider>
  );
}

export default App;
