import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import 'react-bootstrap';
// import axios from 'axios';
// import { useMutation, useQuery } from '@apollo/client';
// import { UPDATE_USER_IMAGE, UPDATE_USER } from '../../utils/mutations';
// import { QUERY_USERS, GET_IMAGE, GET_USER } from '../../utils/queries';
// import ConsumerEditModal from './ConsumerEditModal';

function ConsumerInfoPublic(props) {

    // const [newuserUrl, setUserUrl] = useState("");
    // const [updateUserImage] = useMutation(UPDATE_USER_IMAGE);

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
    //             // trigger refetch function in here
    //             const uploadUrl = res.data
    //             // setUserUrl(uploadUrl);
    //             updateUserImage({
    //                 variables: {
    //                     user: props._id,
    //                     userImage: uploadUrl
    //                 }, refetchQueries: [{ query: GET_IMAGE }]
    //             })
    //             // alert(`User Image uploaded Successfully.`);
    //             // window.location.reload(false);
    //         })
    //         .catch(console.log);
    // }

    // const uploadImage = async (event) => {
    //     const files = event.target.files;
    //     const base64 = await convertBase64(files[0]);
    //     uploadSingleImage(base64);
    // };


    // console.log(props.address[0]?._id)
    // console.log(props)


    // const initialAddress = props.address[0]
    // const [formState, setFormState] = useState({
    //     user: `${props._id}`,
    //     firstName: `${props.firstName}`,
    //     lastName: `${props.lastName}`,
    //     address: `${initialAddress?._id}`,
    //     street: `${initialAddress?.street}`,
    //     city: `${initialAddress?.city}`,
    //     state: `${initialAddress?.state}`,
    //     zipcode: `${initialAddress?.zipcode}`,
    //     biography: `${props.biography}`,
    //     phone: `${props.phone}`,
    // });

    // console.log(formState);

    // const [updateUser] = useMutation(UPDATE_USER);
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formState);
    //     await updateUser({
    //         variables: {
    //             user: props._id,
    //             firstName: formState.firstName,
    //             lastName: formState.lastName,

    //             address: props.address[0]?._id,
    //             street: formState.street,
    //             city: formState.city,
    //             state: formState.state,
    //             zipcode: formState.zipcode,

    //             biography: formState.biography,
    //             phone: formState.phone,
    //         }, refetchQueries: [{ query: GET_USER }]
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
                    <h1>{props.firstName} {props.lastName}</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <label className="col-md-6 profile-image">
                    <img
                        src={props.userImage ? props.userImage : "https://placehold.co/600x600"}
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
                            <p>{props.biography}</p>
                        </div>

                        <div className="mt-5">
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faUser} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Address</h5>
                                    <p>{props.address[0]?.street}, {props.address[0]?.city}, {props.address[0]?.state}, {props.address[0]?.zipcode}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2"><FontAwesomeIcon icon={faPhone} size="3x" /></div>
                                <div className="col-lg-10 col-md-10">
                                    <h5>Contact</h5>
                                    <p>{props.phone}, {props.email}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ConsumerInfoPublic;
