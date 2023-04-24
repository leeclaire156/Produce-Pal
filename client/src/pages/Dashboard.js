import React, { useState } from 'react';
import VendorDashboard from '../components/VendorDashboard';
import ConsumerDashboard from '../components/ConsumerDashboard';
import NavBar from '../components/NavBar';
import UserToggle from '../components/UserToggle';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from "../utils/auth";

// should be conditionally rendered for context user
function Dashboard() {
    // const { loading, data } = useQuery(QUERY_USER);
    // const user = data?.user || []
    // console.log(user)

    const [vendorStatus, setVendorStatus] = useState(false);

    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'mewing123@gmail.com',
        address: '123 Water St, Providence RI, USA',
        vendorName: 'The CoOp Farm',
        vendorAddress: '123 Main Street, Bethesda, MD, 22012',
        vendorTelephone: 2026759012,
        vendorDescription: 'We work with other farms to compile great products.',
        vendorStatus
    };

    const toggleVendorStatus = () => {
        setVendorStatus(!vendorStatus);
    };

    // if (Auth.loggedIn()) { // should render dashboard only if user is logged in. ...should.
    return (
        <div className='container'>
            <NavBar />
            <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
            {vendorStatus ? <VendorDashboard {...user} /> : <ConsumerDashboard {...user} />}
        </div>
    );
    // }
}

export default Dashboard;
