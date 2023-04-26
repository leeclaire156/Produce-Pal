import React from 'react';
import FarmList from '../components/FarmList';
import { useQuery } from '@apollo/client';
import { QUERY_ONLY_FARMS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ONLY_FARMS);
  console.log(data)
  const farms = data?.farms || [];
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
