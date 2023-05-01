import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faPhone, faStore, faCarrot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useMutation, useQuery } from '@apollo/client';
// import { UPDATE_VENDOR_IMAGE, UPDATE_VENDOR } from '../../utils/mutations';
// import { QUERY_USERS, GET_VENDOR_IMAGE, GET_VENDOR } from '../../utils/queries';
// import ConsumerEditModal from './ConsumerEditModal';

function VendorInfoPublic() {
    const { id } = useParams();


    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id }
    });
    const vendorInfo = data?.user || {};



    if (!loading) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center mb-5 profile-title">
                        <h1>{vendorInfo.vendorName}</h1>
                    </div>
                </div>
                <div className="row align-items-center">
                    <label className="col-md-6 profile-image profile-image-other">
                        <img
                            src={vendorInfo.vendorImage ? vendorInfo.vendorImage : "https://placehold.co/600x600"}
                            alt=""
                            className="img-fluid "
                            height={600}
                            width={600}
                        />
                    </label>
                    <div className="col-md-6">
                        <div className="profile-information">
                            <div className="profile-about mb-5">
                                <h1>About</h1>
                            </div>
                            <div className="profile-bio">
                                <p>{vendorInfo.vendorDescription}</p>
                            </div>

                            <div className="mt-5">
                                <div className="row">
                                    <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faLocation} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Address</h5>
                                        <p>{vendorInfo.vendorAddress[0]?.street}, {vendorInfo.vendorAddress[0]?.city}, {vendorInfo.vendorAddress[0]?.state}, {vendorInfo.vendorAddress[0]?.zipcode}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faStore} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Find us at {vendorInfo.marketName}</h5>
                                        <p>{vendorInfo.pickupAddress[0]?.street}, {vendorInfo.pickupAddress[0]?.city}, {vendorInfo.pickupAddress[0]?.state}, {vendorInfo.pickupAddress[0]?.zipcode}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Contact</h5>
                                        <p>{vendorInfo.vendorTelephone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faCarrot} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Farm Products</h5>
                                        <Link to={`/productInventoryother/${vendorInfo._id}`}>
                                            <button type="button" className='btn btn-secondary btn-sm small-view-button'>Explore our farm products</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    } else {
        return (
            <h2 className="container d-flex justify-content-center align-items-center">
                loading...
            </h2>
        )
    }
}

export default VendorInfoPublic;
