import React, { useState } from 'react';
import VendorDashboard from '../components/VendorDashboard';
import ConsumerDashboard from '../components/ConsumerDashboard';
import UserToggle from '../components/UserToggle';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries';

import Auth from "../utils/auth";
import { Redirect } from 'react-router-dom'

function Dashboard() {
    const { profileId } = useParams();

    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : GET_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};
    console.log(profile);


    const [vendorStatus, setVendorStatus] = useState(false);



    const toggleVendorStatus = () => {
        setVendorStatus(!vendorStatus);
    };

    if (Auth.loggedIn()) { // should render dashboard only if user is logged in. ...should.
        if (!loading) {
            return (
                <div className='container'>
                    <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
                    {vendorStatus ? <VendorDashboard {...profile} /> : <ConsumerDashboard {...profile} />}
                </div>
            )
        } else {
            return (
                <h2 className="container d-flex justify-content-center align-items-center">
                    loading...
                </h2>
            )
        }
    }
    else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    }
}

export default Dashboard;
