import React from 'react';

function UserToggle({ vendorStatus, onToggle }) {
    return (
        <div className="container mt-5">
            <div className="toggle-container text-end">
                <button className="btn btn-primary toggle-btn" onClick={onToggle}>
                    {vendorStatus ? 'Switch to Consumer' : 'Switch to Vendor'}
                </button>
            </div>
        </div>
    );
}

export default UserToggle;
