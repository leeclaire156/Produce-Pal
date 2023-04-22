import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Upload from './components/addProductTest'; //Claire's testing ground for cloudinary
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard.js'
import ConsumerProfile from './pages/ConsumerProfile.js'
// import VendorProfile from './pages/VendorProfile.js'
import Login from './components/LoginForm.js'
import Signup from './components/SignupForm.js'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <>
            <Switch>
              <Route exact path='/test' component={Upload} />
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/consumer-profile' component={ConsumerProfile} />
              {/* <Route exact path='/vendor-profile' component={VendorProfile} /> */}
              {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}
              {/* <Route path="*" component={Error404} /> */}
            </Switch>
          </>
        </Router>
    </ApolloProvider>
  );
}

export default App;
