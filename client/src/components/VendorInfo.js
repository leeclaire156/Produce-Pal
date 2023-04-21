import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faCarrot } from '@fortawesome/free-solid-svg-icons';

function VendorInfo(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>CSA Farm A</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://placehold.co/600x600"
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6">
                    <div className="">
                        <div className="">
                            <h3>About</h3>
                        </div>
                        <div className="">
                            <p>Farm description</p>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    <p>Address</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5> Contact</h5>
                                    <p>Contact</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faCarrot} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Products</h5>
                                    <p>Click to see our products</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorInfo;
