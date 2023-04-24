import React, { useState } from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faCarrot, faCamera } from '@fortawesome/free-solid-svg-icons';
// import ConsumerEditModal from './ConsumerEditModal';

function VendorInfo(props) {

    const [showCamera, setShowCamera] = useState(false);

    const handleProfileImageMouseEnter = () => {
        setShowCamera(true);
    };

    const handleProfileImageMouseLeave = () => {
        setShowCamera(false);
    };

    return (
        <div className="container-fluid">
            <div className="toggle-container text-end">
                {props.currentUser
                    ? <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#consumerModal">
                        Edit
                    </button>
                    : <button className="btn btn-primary visually-hidden">
                        Hidden
                    </button>}
            </div>
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>{props.vendorName}</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6 profile-image"
                    onMouseEnter={handleProfileImageMouseEnter}
                    onMouseLeave={handleProfileImageMouseLeave}
                >
                    <img
                        src="https://placehold.co/600x600"
                        alt=""
                        className="img-fluid "
                    />
                    {props.currentUser && showCamera && (
                        <div className="camera-overlay">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    )}

                </div>
                <div className="col-md-6">
                    <div className="">
                        <div className="">
                            <h3>About</h3>
                        </div>
                        <div className="">
                            <p>{props.vendorDescription}</p>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    <p>{props.vendorAddress}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Contact</h5>
                                    <p>{props.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faCarrot} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Farm Products</h5>
                                    <p>Click to view and purchase products from our farm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Edit consumer profile Modal --> */}
            <div class="modal fade" id="consumerModal" tabindex="-1" aria-labelledby="consumerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="consumerModalLabel">Edit my profile</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="form-group">
                                <label>Farm name</label>
                                <input type="text" className="form-control text-muted" id="full-name-input" value={props.vendorName} />
                            </div>
                            <div className="form-group">
                                <label>Farm address</label>
                                <input type="text" className="form-control text-muted" id="address-input" value={props.vendorAddress} />
                            </div>
                            <div className="form-group">
                                <label>Contact</label>
                                <input type="text" className="form-control text-muted" id="contact-input" value={props.email} />
                            </div>
                            <div className="form-group">
                                <label>Pickup location</label>
                                <input type="text" className="form-control text-muted" id="pickupLocation-input" value={props.pickupLocation} />
                            </div>
                            <div className="form-group">
                                <label>About</label>
                                <textarea className="form-control text-muted" id="description-input" rows="5" value={props.vendorDescription}></textarea>
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

export default VendorInfo;
