import React from 'react';
import { Link } from 'react-router-dom';

const FarmCard = ({ farm }) => {
    return (
        <div className="card border-0 mb-3 farm-card">
            <div className="row g-0">
                <div className="col-md-6  d-flex farm-img-container">
                    <img
                        src={farm.vendorImage ? farm.vendorImage : "https://placehold.co/600x400"}
                        alt=""
                        className="img-fluid rounded-start farm-card-img"
                    />
                </div>

                <div className="col-md-6 ">
                    <div className="card-body ms-2">
                        <h2 className="card-title mb-3 mt-3">{farm.vendorName ? farm.vendorName : "Coming Soon"}</h2>
                        {farm.vendorAddress[0]?.street ?
                            <h6 className="card-subtitle mb-4">{farm.vendorAddress[0]?.street} {farm.vendorAddress[0]?.city} {farm.vendorAddress[0]?.state} {farm.vendorAddress[0]?.zipcode}</h6>
                            :
                            <h6 className="card-subtitle mb-4">Stay Tuned</h6>
                        }
                        <p className="card-text mb-4">{farm.vendorDescription ? farm.vendorDescription : "No Description Available"}</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start d-flex">
                            <Link to={`/profile/vendor/${farm._id}`}>
                                <button className="btn btn-primary me-md-2" type="button" id={`farmProfileBtn-${farm._id}`}>Farm profile</button>
                            </Link>
                            <Link to={`/productInventoryother/${farm._id}`}>
                                <button className="btn btn-secondary ms-md-1 ms-3" type="button" id={`farmProductsBtn-${farm._id}`}>Farm products</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FarmCard;
