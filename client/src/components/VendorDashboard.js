import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faCarrot } from '@fortawesome/free-solid-svg-icons';

function ConsumerDashboard({ vendorName, vendorAddress, vendorDescription, email, vendorTelephone }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>{vendorName}</h2>
                    <p>{vendorAddress}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faUser} size="3x" />
                            <h5 className="card-title mt-3">About Us</h5>
                            {/* click edit button to create and modify my farm information. Show placeholder information if the user has no farm yet*/}
                            <p className="card-text">{vendorDescription}</p>
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#VendorInfoModal">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faBook} size="3x" />
                            <h5 className="card-title mt-3">Consumer Orders</h5>
                            <p className="card-text">Review and manage consumer orders.</p>
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <FontAwesomeIcon icon={faCarrot} size="3x" />
                            <h5 className="card-title mt-3">Product Inventory</h5>
                            <p className="card-text">Review and manage my product inventory</p>
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- Edit Vendor/Farm Information Modal --> */}
            <div class="modal fade" id="VendorInfoModal" tabindex="-1" aria-labelledby="VendorInfoModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="VendorInfoModalLabel">Edit my farm</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ConsumerDashboard;
