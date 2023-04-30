import React, { useState } from 'react';
import ConsumerInfoPublic from '../components/publicProfile/ConsumerInfoPublic';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER_BY_ID } from '../utils/queries';
import { useProductContext } from '../utils/GlobalState';
import { Link } from 'react-router-dom';
// import { TOGGLE_VENDOR_STATUS, UPDATE_VENDOR_STATUS } from '../utils/actions';
// import { idbPromise } from '../utils/helpers';

function Profile() {

    const { id } = useParams();
    // destructure refetch function and pass as a prop to consumerinfo component, then in that 
    const { loading, data } = useQuery(
        GET_ONE_USER_BY_ID,
        {
            variables: { id: id },
        },
    );

    const profile =  data?.profile || {};
    console.log(profile);



    if (Auth.loggedIn()) { // should render profile only if user is logged in. ...should.  It can be reused to render other user's profile by different routes with user._id  .
        if (!loading) {
            return (
                <div className='container'>
                    {/* this toggle button needs to be moved to navBar when implementing */}
                    {/* <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} /> */}
                    <div className="container mt-5">
                        <ConsumerInfoPublic />
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
    } else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    }
}

export default Profile;
