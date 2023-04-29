import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCarrot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function VendorDashboard({ vendorName, vendorAddress, vendorDescription, email, vendorTelephone }) {

    return (
        <div className="container mt-5">
            <div className="row mb-5">
                <div className="col dashboard-title text-center">
                    <h1>{vendorName}</h1>
                    <p>{vendorAddress[0]?.street}, {vendorAddress[0]?.city}, {vendorAddress[0]?.state}, {vendorAddress[0]?.zipcode}</p>
                    {/* <p>About us: {vendorDescription}</p> */}
                    {/* <p>Vendor Telephone: {vendorTelephone}</p> */}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faUser} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">About Us</h5>
                            {/* click edit button to create and modify my farm information. Show placeholder information if the user has no farm yet*/}
                            <p className="card-text">{vendorDescription}</p>
                            <Link to="/profile">
                                <button className="btn btn-primary">View</button>
                                {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#VendorInfoModal">Edit</button> */}
                            </Link>
                            {/* <Link to="/profile">
                                <button className="btn btn-primary">View</button>
                            </Link> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faBook} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">Sales History</h5>
                            <p className="card-text">Review and manage your sales.</p>
                            <Link to="/profile">
                                {/* Wait for Zhihao's vendor sale history component */}
                                <button className="btn btn-primary">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card dashboard-card">
                        <div className="card-body text-center">
                            <FontAwesomeIcon icon={faCarrot} size="3x" className='fa-icon' />
                            <h5 className="card-title mt-3">Product Inventory</h5>
                            <p className="card-text">Review and manage my product inventory</p>
                            <Link to="/productInventory">
                                <button className="btn btn-primary">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- Edit Vendor/Farm Information Modal --> */}
            {/* <div className="modal fade" id="VendorInfoModal" tabIndex="-1" aria-labelledby="VendorInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="VendorInfoModalLabel">Edit my farm</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Farm Name</label>
                                <input type="text" className="form-control text-muted" id="full-name-input" value={vendorName} />
                            </div>
                            <div className="form-group">
                                <label>Farm Address</label>
                                <input type="text" className="form-control text-muted" id="address-input" value={vendorAddress} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control text-muted" id="contact-input" value={email} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" className="form-control text-muted" id="membership-input" value={vendorTelephone} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control text-muted" id="description-input" rows="5" value={vendorDescription}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    );
}

export default VendorDashboard;
