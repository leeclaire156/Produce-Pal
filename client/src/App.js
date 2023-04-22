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

// stripe -------------------------------------------------------

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);



  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );


// end stripe ---------------------------------------------------------------------------------











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
