import React, { useState } from 'react';
import VendorDashboard from '../components/VendorDashboard';
import ConsumerDashboard from '../components/ConsumerDashboard';
import UserToggle from '../components/UserToggle';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries';
import { useProductContext } from '../utils/GlobalState';
import Auth from "../utils/auth";
import { Redirect } from 'react-router-dom'
import { idbPromise } from '../utils/helpers';
import { TOGGLE_VENDOR_STATUS, UPDATE_VENDOR_STATUS } from '../utils/actions';


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

    const [state, dispatch] = useProductContext();
    const { vendorStatus } = state;

    // load current vendorStatus from IndexDB if there is one
    const loadVendorStatus = async () => {
        const vendorStatusIDB = await idbPromise('vendorStatus', 'get');
        // console.log(vendorStatusIDB[0].vendorStatus);
        if (vendorStatusIDB[0].vendorStatus === true || vendorStatusIDB[0].vendorStatus === false) {
            dispatch({ type: UPDATE_VENDOR_STATUS, vendorStatus: vendorStatusIDB[0].vendorStatus });
        } else {
            const vendorStatusObj = { _id: 1, vendorStatus: vendorStatus };
            idbPromise('vendorStatus', 'put', vendorStatusObj);
        };
        return;
    };
    // only allow loadVendorStatus() function to run once when the page loading.
    window.addEventListener('load', async function onLoad() {
        loadVendorStatus();
        window.removeEventListener('load', onLoad);
    });

    console.log("global VendorStatus =" + vendorStatus);
    // toggleVendorStatus function to update the vendorStatus in globalState and IndexDB.
    const toggleVendorStatus = async () => {
        try {
            // console.log(vendorStatus);
            await dispatch({ type: TOGGLE_VENDOR_STATUS })
            const vendorStatusObj = { _id: 1, vendorStatus: !vendorStatus };
            await idbPromise('vendorStatus', 'put', vendorStatusObj);
        } catch (error) {
            console.error(error);
            throw error;
        }
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
