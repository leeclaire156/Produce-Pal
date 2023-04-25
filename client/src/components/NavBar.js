import React, { useState, useEffect } from 'react';
import Auth from "../utils/auth";

function NavBar({ currentPage, handlePageChange }) {

  const [isExpanded, setIsExpanded] = useState(false);

  // Changes document title
  useEffect(() => {
    document.title = "ProducePal"
  })

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  function dashboard() {
    if (Auth.loggedIn()) {
      return (
        <li className="nav-item">
          <a href="/dashboard"
            // onClick={() => handlePageChange('Dashboard')}
            className={currentPage === 'Dashboard' ? 'nav-link active' : 'nav-link'} id={currentPage === 'Dashboard' ? 'dashboard' : 'dashboard-fade'}>Dashboard</a>
        </li>
      )
    }
  }

  function logInOut() {
    if (Auth.loggedIn()) {
      return (
        <li className="nav-item">
          <a href="/" onClick={() => Auth.logout()}
            className={'nav-link'} >Logout</a>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a href="/signup"
              className={'nav-link'} >Signup</a>
          </li>
          <li className="nav-item">
            <a href="/login"
              className={'nav-link'} >Login</a>
          </li>
        </>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light container">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" id='nav-brand-text'>ProducePal</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/"
                // onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'} id={currentPage === 'Home' ? 'home' : 'home-fade'}>Home</a>
            </li>
            {dashboard()}
            <li className="nav-item">
              <a href="#"
                className={'nav-link'} >
                <i className="fas fa-shopping-cart"></i>
                Cart</a>
            </li>
            {logInOut()}
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
