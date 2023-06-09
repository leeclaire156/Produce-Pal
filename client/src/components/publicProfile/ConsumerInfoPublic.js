import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useMutation, useQuery } from '@apollo/client';
// import { UPDATE_USER_IMAGE, UPDATE_USER } from '../../utils/mutations';
// import { QUERY_USERS, GET_IMAGE, GET_USER } from '../../utils/queries';
// import ConsumerEditModal from './ConsumerEditModal';

function ConsumerInfoPublic() {
    const { id } = useParams();


    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id }
    });
    const consumerInfo = data?.user || {};



    if (!loading) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center mb-3 mb-md-5 profile-title">
                        <h1>{consumerInfo.firstName} {consumerInfo.lastName}</h1>
                    </div>
                </div>
                <div className="row align-items-center">
                    <label className="col-md-6 profile-image">
                        <img
                            src={consumerInfo.userImage ? consumerInfo.userImage : "https://placehold.co/600x600"}
                            alt=""
                            className="img-fluid "
                            height={600}
                            width={600}
                        />
                    </label>

                    <div className="col-md-6">
                        <div className="profile-information text-center text-md-start">
                            <div className="profile-about mb-2 mb-md-5 mt-3 mt-md-0">
                                <h1>About</h1>
                            </div>
                            <div className="profile-bio">
                                <p>{consumerInfo.biography ? consumerInfo.biography : "No Description Available"}</p>
                            </div>

                            <div className="mt-2 mt-md-5">
                                <div className="row">
                                    <div className="col-lg-2 col-md-2 mb-1 mb-md-0"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Address</h5>
                                        {consumerInfo.address[0]?.street ?
                                            <p> {consumerInfo.address[0]?.street}, {consumerInfo.address[0]?.city}, {consumerInfo.address[0]?.state}, {consumerInfo.address[0]?.zipcode}</p>
                                            :
                                            <p>No information provided</p>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2 mb-1 mb-md-0"><FontAwesomeIcon icon={faEnvelope} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10 mb-3 mb-md-0">
                                        <h5>Email</h5>
                                        <p>{consumerInfo.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2 mb-1 mb-md-0"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                    <div className="col-lg-10 col-md-10">
                                        <h5>Phone</h5>
                                        {consumerInfo.phone ?
                                            <p>{consumerInfo.phone}</p>
                                            :
                                            <p>No information provided</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    } else {
        return (
            <h2 className="container d-flex justify-content-center align-items-center">
                loading...
            </h2>
        )
    }
}

export default ConsumerInfoPublic;
