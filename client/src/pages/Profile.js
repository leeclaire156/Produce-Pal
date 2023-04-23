import React, { useState } from 'react';
import UserToggle from '../components/UserToggle';
import ConsumerInfo from '../components/consumerInfo/ConsumerInfo';
import NavBar from '../components/NavBar';
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

    return (
        <div>
            <NavBar />
            {/* this toggle button needs to be removed when implementing */}
            <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
            <div className="container mt-5">
                <ConsumerInfo {...user} onSave={handleSave} />
            </div>
        </div>
    );
}

export default Profile;
