import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
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
    console.log(id);
    
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id }
    });
    const consumerInfo = data?.user || {};

    console.log(consumerInfo);

    if(!loading){
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center mb-5">
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
                    <div className="">
                        <div className="">
                            <h3>About</h3>
                        </div>
                        <div className="">
                            <p>{consumerInfo.biography}</p>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    <p>{consumerInfo.address[0]?.street}, {consumerInfo.address[0]?.city}, {consumerInfo.address[0]?.state}, {consumerInfo.address[0]?.zipcode}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Contact</h5>
                                    <p>{consumerInfo.phone}, {consumerInfo.email}</p>
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

export default ConsumerInfoPublic;
