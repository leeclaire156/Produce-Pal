import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faCarrot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'react-bootstrap';
// import axios from 'axios';
// import { useMutation, useQuery } from '@apollo/client';
// import { UPDATE_VENDOR_IMAGE, UPDATE_VENDOR } from '../../utils/mutations';
// import { QUERY_USERS, GET_VENDOR_IMAGE, GET_VENDOR } from '../../utils/queries';
// import ConsumerEditModal from './ConsumerEditModal';

function VendorInfoPublic(props) {

    // const [newuserUrl, setUserUrl] = useState("");
    // const [updateVendorImage] = useMutation(UPDATE_VENDOR_IMAGE);

    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    // function uploadSingleImage(base64) {
    //     axios
    //         .post("http://localhost:3000/uploadImage", { image: base64 })
    //         .then((res) => {
    //             const uploadVendorUrl = res.data
    //             setUserUrl(uploadVendorUrl);
    //             updateVendorImage({
    //                 variables: {
    //                     user: props._id,
    //                     vendorImage: uploadVendorUrl
    //                 }, refetchQueries: [{ query: GET_VENDOR_IMAGE }]
    //             })
    //         })
    //         .catch(console.log);
    // }

    // const uploadImage = async (event) => {
    //     const files = event.target.files;
    //     const base64 = await convertBase64(files[0]);
    //     uploadSingleImage(base64);
    // };

    // console.log(props)
    // console.log(props.vendorAddress[0]?._id)
    // console.log(props.pickupAddress[0]?._id)


    // const vendorAddress = props.vendorAddress[0]
    // const pickupAddress = props.pickupAddress[0]
    // const [formState, setFormState] = useState({
    //     user: `${props._id}`,
    //     vendorName: `${props.vendorName}`,

    //     vendorAddress: `${vendorAddress?._id}`,
    //     street: `${vendorAddress?.street}`,
    //     city: `${vendorAddress?.city}`,
    //     state: `${vendorAddress?.state}`,
    //     zipcode: `${vendorAddress?.zipcode}`,

    //     vendorDescription: `${props.vendorDescription}`,
    //     vendorTelephone: `${props.vendorTelephone}`,

    //     marketName: `${props.marketName}`,
    //     pickupAddress: `${pickupAddress?._id}`,
    //     updatePickupAddressStreet2: `${pickupAddress?.street}`,
    //     updatePickupAddressCity2: `${pickupAddress?.city}`,
    //     updatePickupAddressState2: `${pickupAddress?.state}`,
    //     updatePickupAddressZipcode2: `${pickupAddress?.zipcode}`,
    // });

    // console.log(formState);

    // const [updateVendor] = useMutation(UPDATE_VENDOR);
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formState);
    //     await updateVendor({
    //         variables: {
    //             user: props._id,
    //             vendorName: formState.vendorName,
    //             vendorStatus: true,
    //             // vendor business address
    //             vendorAddress: vendorAddress?._id,
    //             street: formState.street,
    //             city: formState.city,
    //             state: formState.state,
    //             zipcode: formState.zipcode,
    //             vendorTelephone: formState.vendorTelephone,
    //             vendorDescription: formState.vendorDescription,

    //             marketName: formState.marketName,
    //             // id for pickup address
    //             pickupAddress: pickupAddress?._id,
    //             updatePickupAddressStreet2: formState.updatePickupAddressStreet2,
    //             updatePickupAddressCity2: formState.updatePickupAddressCity2,
    //             updatePickupAddressState2: formState.updatePickupAddressState2,
    //             updatePickupAddressZipcode2: formState.updatePickupAddressZipcode2,
    //         }, refetchQueries: [{ query: GET_VENDOR }]
    //     });
    // };


    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormState(input => {
    //         const formState = { ...input }
    //         formState[name] = value;
    //         return formState;
    //     })
    // }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1>{props.vendorName}</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <label className="col-md-6 profile-image">
                    <img
                        src={props.vendorImage ? props.vendorImage : "https://placehold.co/600x600"}
                        alt=""
                        className="img-fluid "
                        height={600}
                        width={600}
                    />
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
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Find us at {props.marketName}</h5>
                                    <p>{props.pickupAddress[0]?.street}, {props.pickupAddress[0]?.city}, {props.pickupAddress[0]?.state}, {props.pickupAddress[0]?.zipcode}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Contact</h5>
                                    <p>{props.vendorTelephone}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faCarrot} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Farm Products</h5>
                                    <Link to={`/productInventoryother/${props._id}`}>
                                    <button>Click to view and purchase products from our farm</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VendorInfoPublic;
