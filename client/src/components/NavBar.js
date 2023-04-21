import React, { useState } from 'react';


function NavBar({ currentPage, handlePageChange }) {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" id='nav-brand-text'>ProducePal</a>
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
              <a href="#"
                onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'} id={currentPage === 'Home' ? 'home' : 'home-fade'}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#"
                onClick={() => handlePageChange('Dashboard')}
                className={currentPage === 'Portfolio' ? 'nav-link active' : 'nav-link'} id={currentPage === 'Dashboard' ? 'dashboard' : 'dashboard-fade'}>Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#"
                className={'nav-link'} >
                <i class="fas fa-shopping-cart me-2"></i>
                Cart</a>
            </li>
            <li className="nav-item">
              <a href="#"
                className={'nav-link'} >Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
