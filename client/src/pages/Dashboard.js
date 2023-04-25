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

    // const user = {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'mewing123@gmail.com',
    //     address: '123 Water St, Providence RI, USA',
    //     vendorName: 'The CoOp Farm',
    //     vendorAddress: '123 Main Street, Bethesda, MD, 22012',
    //     vendorTelephone: 2026759012,
    //     vendorDescription: 'We work with other farms to compile great products.',
    //     vendorStatus
    // };

    const toggleVendorStatus = () => {
        setVendorStatus(!vendorStatus);
    };

    if (Auth.loggedIn()) { // should render dashboard only if user is logged in. ...should.
        return (
            <div className='container'>

                <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
                {vendorStatus ? <VendorDashboard {...profile} /> : <ConsumerDashboard {...profile} />}
            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    }
}

export default Dashboard;
