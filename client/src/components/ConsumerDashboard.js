import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCarrot } from '@fortawesome/free-solid-svg-icons';

function ConsumerDashboard({ firstName, lastName, address }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>{firstName} {lastName}</h2>
                    <p>{address}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faUser} size="3x" />
                            <h5 className="card-title mt-3">My profile</h5>
                            <p className="card-text">This is my profile description.</p>
                            {/* This edit button navigates to 'ConsumerProfile.js' component */}
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faBook} size="3x" />
                            <h5 className="card-title mt-3">Order history</h5>
                            <p className="card-text">Review my order history.</p>
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faCarrot} size="3x" />
                            <h5 className="card-title mt-3">Search farm products</h5>
                            <p className="card-text">Look for farm products in different farms.</p>
                            {/* This edit button navigates to 'Home.js' component */}
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsumerDashboard;
