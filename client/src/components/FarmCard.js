import React from 'react';
import { Link } from 'react-router-dom';

const FarmCard = ({ farm }) => {
    return (
        <div className="card border-0 mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-md-6">
                    <img
                        src={farm.vendorImage ? farm.vendorImage : "https://placehold.co/600x300"}
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{farm.vendorName}</h5>
                        <h6 className="card-subtitle mb-4">{farm.vendorAddress[0]?.street} {farm.vendorAddress[0]?.city} {farm.vendorAddress[0]?.state} {farm.vendorAddress[0]?.zipcode}</h6>
                        <p className="card-text">{farm.vendorDescription}</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to={`/profile/vendor/${farm._id}`}>
                                <button class="btn btn-primary me-md-2" type="button" id={`farmProfileBtn-${farm._id}`}>Farm profile</button>
                            </Link>
                            <Link to={`/store/${farm._id}`}>
                                <button class="btn btn-secondary" type="button" id={`farmProductsBtn-${farm._id}`}>Farm products</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FarmCard;
