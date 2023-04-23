import React from 'react';
import NavBar from '../components/NavBar';
import FarmList from '../components/FarmList';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const farms = data?.users || [];

  return (
    <div className="container">
      <NavBar />
      <FarmList 
        farms={ farms }
      />
    </div>
  );
};

export default Home;
