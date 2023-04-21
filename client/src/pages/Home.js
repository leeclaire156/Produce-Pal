import React from 'react';
import NavBar from '../components/NavBar';
import FarmList from '../components/FarmList';

const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <FarmList />
    </div>
  );
};

export default Home;
