import React from 'react';
import FarmList from '../components/FarmList';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const farms = data?.users || [];
  console.log(farms)


  return (
    <div className="container">
      <FarmList 
        farms={ farms }
      />
    </div>
  );
};

export default Home;
