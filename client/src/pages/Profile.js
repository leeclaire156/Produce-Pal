import React, { useState } from 'react';
import UserToggle from '../components/UserToggle';
import ConsumerInfo from '../components/userInfo/ConsumerInfo';
import VendorInfo from '../components/userInfo/VendorInfo';

// add this to nav bar conditional renderings

function Profile() {

    const [vendorStatus, setVendorStatus] = useState(false);

    const user = {
        firstName: 'John',
        lastName: 'Doe',
        biography: 'I am John Doe.',
        vendorName: 'CSA Providence Farm',
        vendorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit sapien eu neque blandit, vel finibus urna tincidunt. Vivamus vel magna vestibulum, feugiat quam sed, molestie quam.',
        address: '123 Main St, Providence RI, USA',
        vendorAddress: '456 Water St, Providence RI, USA',
        email: 'johndoe@gmail.com',
        memberships: 'Silver Tier',
        vendorStatus
    };

    const handleSave = (data) => {
        // setDescription(data.description);
        console.log('need data from database');
    };

    const toggleVendorStatus = () => {
        setVendorStatus(!vendorStatus);
    };

    // if (Auth.loggedIn()) { // should render profile only if user is logged in. ...should.  It can be reused to render other user's profile by different routes with user._id  .
    return (
        <div className='container'>
            {/* this toggle button needs to be moved to navBar when implementing */}
            <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
            <div className="container mt-5">
                {vendorStatus ? <VendorInfo {...user} onSave={handleSave} /> : <ConsumerInfo {...user} onSave={handleSave} />}
            </div>
        </div>
    );
    // }
}

export default Profile;
