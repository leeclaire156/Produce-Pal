import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCarrot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ConsumerDashboard({ firstName, lastName, address, biography }) {
    return (
        <div className="container mt-5">
            <div className="row mb-3 mb-md-5">
                <div className="col dashboard-title text-center">
                    <h1>{firstName} {lastName} </h1>
                    {address[0]?.street ?
                        <p>{address[0]?.street}, {address[0]?.city}, {address[0]?.state}, {address[0]?.zipcode}</p>
                        :
                        <p>Add an address in your profile</p>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 mb-3">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faUser} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">My profile</h5>
                            {biography ?
                                <p className="card-text">{biography}</p>
                                : <p className="card-text">Click to add profile description.</p>}
                            {/* This edit button navigates to 'ConsumerProfile.js' component */}
                            <Link to="/profile">
                                <button className="btn btn-primary dashboard-card-btn">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faBook} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">Order history</h5>
                            <p className="card-text">Review my order history.</p>
                            <Link to="/order-history">
                                <button className="btn btn-primary dashboard-card-btn">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faCarrot} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">Search farm products</h5>
                            <p className="card-text">Look for farm products in different farms.</p>
                            {/* This edit button navigates to 'Home.js' component */}
                            <Link to="/home">
                                <button className="btn btn-primary dashboard-card-btn">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ConsumerDashboard;
