import React, { useState } from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import 'react-bootstrap';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_IMAGE, UPDATE_USER } from '../../utils/mutations';
import { QUERY_USERS, GET_IMAGE, GET_USER } from '../../utils/queries';
// import ConsumerEditModal from './ConsumerEditModal';

function ConsumerInfo(props) {
    const PORT = process.env.PORT
    const [showCamera, setShowCamera] = useState(false);

    const handleProfileImageMouseEnter = () => {
        setShowCamera(true);
    };

    const handleProfileImageMouseLeave = () => {
        setShowCamera(false);
    };


    const [newuserUrl, setUserUrl] = useState("");
    const [updateUserImage] = useMutation(UPDATE_USER_IMAGE);

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

    const [loading, setLoading] = useState(false);

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post(`https://ppt2.herokuapp.com/uploadImage`, { image: base64 })
            // .post(`http://localhost:${PORT}/uploadImage`, { image: base64 })
            // .post("https://api.cloudinary.com/v1_1/dcvtyvwii/uploadImage", { image: base64 })
            // .post("https://api.cloudinary.com/v1_1/dcvtyvwii/uploadImage", { image: base64 })
            .then((res) => {
                // trigger refetch function in here
                const uploadUrl = res.data
                // setUserUrl(uploadUrl);
                updateUserImage({
                    variables: {
                        user: props._id,
                        userImage: uploadUrl
                    }, refetchQueries: [{ query: GET_IMAGE }]
                })
                // alert(`User Image uploaded Successfully.`);
                // window.location.reload(false);
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        const base64 = await convertBase64(files[0]);
        uploadSingleImage(base64);
    };



    const initialAddress = props.address[0]
    const [formState, setFormState] = useState({
        user: `${props._id}`,
        firstName: `${props.firstName}`,
        lastName: `${props.lastName}`,
        address: `${initialAddress?._id}`,
        street: `${initialAddress?.street}`,
        city: `${initialAddress?.city}`,
        state: `${initialAddress?.state}`,
        zipcode: `${initialAddress?.zipcode}`,
        biography: `${props.biography}`,
        phone: `${props.phone}`,
    });


    const [updateUser] = useMutation(UPDATE_USER);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(formState); //Keep for future development debugging
        await updateUser({
            variables: {
                user: props._id,
                firstName: formState.firstName,
                lastName: formState.lastName,

                address: props.address[0]?._id,
                street: formState.street,
                city: formState.city,
                state: formState.state,
                zipcode: formState.zipcode,

                biography: formState.biography,
                phone: formState.phone,
            }, refetchQueries: [{ query: GET_USER }]
        });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(input => {
            const formState = { ...input }
            formState[name] = value;
            return formState;
        })
    }


    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-12 text-center mb-3 mb-md-5 profile-title">
                    <h1>{props.firstName} {props.lastName}</h1>
                </div>
            </div>
            <div className="row align-items-center">

                <label className="col-md-6 profile-image"
                    onMouseEnter={handleProfileImageMouseEnter}
                    onMouseLeave={handleProfileImageMouseLeave}
                >
                    {showCamera && (
                        <div className="camera-overlay">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    )}
                    <img
                        src={props.userImage ? props.userImage : "https://placehold.co/600x600"}
                        alt=""
                        className={loading ? "img-fluid loading-img" : "img-fluid"}
                        height={600}
                        width={600}
                    />
                    <input name='userImage' type="file" onChange={uploadImage} id={props.userImage} hidden></input>
                </label>

                <div className="col-md-6 mt-2 mt-md-0">

                    <div className="toggle-container text-end">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#consumerModal">
                            Edit!!!!!
                        </button>
                    </div>

                    <div className="profile-information text-center text-md-start">
                        <div className="profile-about mb-2 mb-md-5">
                            <h1>About</h1>
                        </div>
                        <div className="profile-bio">
                            <p>{props.biography ? props.biography : "No Description Available"}</p>
                        </div>

                        <div className="mt-2 mt-md-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    {props.address[0]?.street ?
                                        <p>{props.address[0]?.street}, {props.address[0]?.city}, {props.address[0]?.state}, {props.address[0]?.zipcode}</p>
                                        :
                                        <p>No information provided</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faEnvelope} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Email</h5>
                                    <p>{props.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Phone</h5>
                                    {props.phone ?
                                        <p>{props.phone}</p>
                                        :
                                        <p>No information provided</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Edit consumer profile Modal --> */}
            <form className="modal fade" id="consumerModal" tabIndex="-1" aria-labelledby="consumerModalLabel" aria-hidden="true" onSubmit={handleFormSubmit}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="consumerModalLabel">Edit my profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" id="first-name-input" onChange={handleChange} name="firstName" value={formState.firstName} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" id="full-name-input" onChange={handleChange} name="lastName" value={formState.lastName} />
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Street</label>
                                    <input type="text" className="form-control" id="street-input" placeholder={props.address[0]?.street} onChange={handleChange} name="street" value={formState.street} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>City</label>
                                    <input type="text" className="form-control" id="city-input" placeholder={props.address[0]?.city} onChange={handleChange} name="city" value={formState.city} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>State</label>
                                    <input type="text" className="form-control" id="state-input" placeholder={props.address[0]?.state} onChange={handleChange} name="state" value={formState.state} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Zipcode</label>
                                    <input type="text" className="form-control" id="zipcode-input" placeholder={props.address[0]?.zipcode} onChange={handleChange} name="zipcode" value={formState.zipcode} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" className="form-control" id="phone-input" onChange={handleChange} name="phone" value={formState.phone} />
                            </div>
                            {/* <div className="form-group">
                                <label>Memberships</label>
                                <input type="text" className="form-control text-muted" id="membership-input" placeholder={props.memberships} />
                            </div> */}
                            <div className="form-group">
                                <label>Biography</label>
                                <textarea className="form-control" id="description-input" rows="5" onChange={handleChange} name="biography" value={formState.biography}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default ConsumerInfo;
