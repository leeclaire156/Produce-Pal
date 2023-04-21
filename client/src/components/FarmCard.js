import React from 'react';

const FarmCard = ({ farm }) => {
    return (
        <div className="card border-0 mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://placehold.co/600x300"
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{farm.vendorName}</h5>
                        <h6 className="card-subtitle mb-4">{farm.vendorAddress}</h6>
                        <p className="card-text">{farm.vendorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FarmCard;
