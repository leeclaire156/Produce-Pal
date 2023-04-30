import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import NavBar from './components/NavBar';
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard.js'
import Profile from './pages/Profile.js'
// import VendorProfile from './pages/VendorProfile.js'
import Login from './components/loginForm/LoginForm.js'
import Signup from './components/signupForm/SignupForm.js'
import ProductInventory from "./pages/ProductInventory.js"
import ProductInventoryOther from "./pages/ProductInventoryOther"
import OrderHistory from './pages/OrderHistory'
import ProfileOtherVendor from './pages/ProfileOtherVendor'
import ProfileOtherConsumer from './pages/ProfileOtherConsumer'
import { ProductProvider } from './utils/GlobalState.js'
import Success from './pages/Success';

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
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <Router>
        <ProductProvider>
          <>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/dashboard' component={Dashboard} />
              {/* this route is to view my profile either as a consumer or vendor */}
              <Route exact path='/profile' component={Profile} />
              {/* my OrderHistory page -- this route is for buyers/vendors to view their orders/sales */}
              <Route exact path='/order-history' component={OrderHistory} />
              {/* my productInventory page -- this route is for vendor to manage the product inventory */}
              <Route exact path='/productinventory' component={ProductInventory} />
              {/* this route is for consumer to buy farmer products */}
              {/* <Route exact path='/productinventory/:id' component={ProductInventoryOther} /> */}
              {/* this route is for testing */}
              <Route exact path='/productInventoryother/:id' component={ProductInventoryOther} />
              {/* this route is for the consumer to view vendor/farm's profile information */}
              <Route exact path='/profile/vendor/:id' component={ProfileOtherVendor} />
              {/* this route is for farmer to view their consumers who bought their products */}
              <Route exact path='/profile/consumer/:id' component={ProfileOtherConsumer} />
              {/* this route is for the success Stripe payment made page and where addOrder function is called */}
              <Route exact path='/success' component={Success} />
              {/* <Route exact path='/vendor-profile' component={VendorProfile} /> */}
              <Route render={() => <h1 className='display-2 container'>Wrong page!</h1>} />
              {/* <Route path="*" component={Error404} /> */}
            </Switch>
          </>
        </ProductProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
