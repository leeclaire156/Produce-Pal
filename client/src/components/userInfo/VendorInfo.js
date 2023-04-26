import React, { useState } from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faCarrot, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import 'react-bootstrap';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { UPDATE_VENDOR_IMAGE } from '../../utils/mutations';
// import ConsumerEditModal from './ConsumerEditModal';

function VendorInfo(props) {

    const [showCamera, setShowCamera] = useState(false);

    const handleProfileImageMouseEnter = () => {
        setShowCamera(true);
    };

    const handleProfileImageMouseLeave = () => {
        setShowCamera(false);
    };


    const [newuserUrl, setUserUrl] = useState("");
    const [updateVendorImage] = useMutation(UPDATE_VENDOR_IMAGE);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64) {
        axios
            .post("http://localhost:3000/uploadImage", { image: base64 })
            .then((res) => {
                const uploadVendorUrl = res.data
                setUserUrl(uploadVendorUrl);
                updateVendorImage({
                    variables: {
                        user: props._id,
                        vendorImage: uploadVendorUrl
                    }
                })
                // alert(`Vendor Image uploaded Successfully.`);
                window.location.reload(false);
            })
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        const base64 = await convertBase64(files[0]);
        uploadSingleImage(base64);
    };


    return (
        <div className="container-fluid">
            <div className="toggle-container text-end">

                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#consumerModal">
                    Edit
                </button>
                {/* the code below is to verify if the current loggedIn user matches this profile owner. user can only edit profile if 
            the loggedIn user id matches the profile owner id. */}
                {/* {props.currentUser
                    ? <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#consumerModal">
                        Edit
                    </button>
                    : <button className="btn btn-primary visually-hidden">
                        Hidden
                    </button>} */}
            </div>
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>{props.vendorName}</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <label className="col-md-6 profile-image"
                    onMouseEnter={handleProfileImageMouseEnter}
                    onMouseLeave={handleProfileImageMouseLeave}
                >
                    <img
                        src={props.vendorImage ? props.vendorImage : "https://placehold.co/600x600"}
                        alt=""
                        className="img-fluid "
                        height={600}
                        width={600}
                    />
                    {props.currentUser && showCamera && (
                        <div className="camera-overlay">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    )}
                    <input name='userImage' type="file" onChange={uploadImage} id={props.userImage} hidden></input>
                </label>
                <div className="col-md-6">
                    <div className="">
                        <div className="">
                            <h3>About</h3>
                        </div>
                        <div className="">
                            <p>{props.vendorDescription}</p>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    <p>{props.vendorAddress[0]?.street}, {props.vendorAddress[0]?.city}, {props.vendorAddress[0]?.state}, {props.vendorAddress[0]?.zipcode}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Contact</h5>
                                    <p>{props.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faCarrot} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Farm Products</h5>
                                    <p>Click to view and purchase products from our farm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Edit consumer profile Modal --> */}
            <div className="modal fade" id="consumerModal" tabIndex="-1" aria-labelledby="consumerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="consumerModalLabel">Edit my farm profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label>Farm name</label>
                                <input type="text" className="form-control text-muted" id="farm-name-input" defaultValue={props.vendorName} />
                            </div>

                            <div className="form-group mb-3">
                                <label>Farm address</label>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Street</label>
                                        <input type="text" className="form-control text-muted" id="farm-street-input" defaultValue={props.vendorAddress?.street} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>City</label>
                                        <input type="text" className="form-control text-muted" id="farm-city-input" defaultValue={props.vendorAddress?.city} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>State</label>
                                        <input type="text" className="form-control text-muted" id="farm-state-input" defaultValue={props.vendorAddress?.state} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Zipcode</label>
                                        <input type="text" className="form-control text-muted" id="farm-zipcode-input" defaultValue={props.vendorAddress?.zipcode} />
                                    </div>
                                </div>
                            </div>


                            <div className="form-group mb-3">
                                <label>Contact</label>
                                <input type="text" className="form-control text-muted" id="phone-input" defaultValue={props.phone} />
                            </div>
                            <div className="form-group mb-3">
                                <label>Pickup location</label>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label>Street</label>
                                        <input type="text" className="form-control text-muted" id="pickup-street-input" defaultValue={props.pickupAddress?.street} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>City</label>
                                        <input type="text" className="form-control text-muted" id="pickup-city-input" defaultValue={props.pickupAddress?.city} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>State</label>
                                        <input type="text" className="form-control text-muted" id="pickup-state-input" defaultValue={props.pickupAddress?.state} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Zipcode</label>
                                        <input type="text" className="form-control text-muted" id="pickup-zipcode-input" defaultValue={props.pickupAddress?.zipcode} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>About</label>
                                <textarea className="form-control text-muted" id="description-input" rows="5" defaultValue={props.vendorDescription}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VendorInfo;
