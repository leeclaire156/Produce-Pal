import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { Form, Button, Dropdown } from 'react-bootstrap';
// import './signupForm.css';
import eye from '../assets/eye_icongeek26.png'
import blindeye from '../assets/blind-eye_icongeek26.png'

import axios from 'axios';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorEmailMessage, setEmailError] = useState(false);
    const [passwordType, setPasswordType] = useState(false)
    const [eyeImage, setEyeImage] = useState(true)
    const [notFilled, setFilledStatus] = useState(false)
    const [addUser] = useMutation(ADD_USER);
    const [validate, setValidate] = useState(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget
        if (form.checkValidity === false) {
            // event.preventDefault
            // event.stopPropolgation
        } else { setValidate(true) }

        console.log(formState);
        const mutationResponse = await addUser({
            variables: {

                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                password: formState.password,

                addAddressEmail2: formState.email,
                street: formState.street,
                city: formState.city,
                state: formState.state,
                zipcode: formState.zipcode,

                biography: formState.biography,
                phone: formState.phone,
                userImage: userUrl,


                vendorStatus: formState.vendorStatus,
                vendorName: formState.vendorName,

                addVendorAddressEmail2: formState.email,
                addVendorAddressStreet2: formState.addVendorAddressStreet2,
                addVendorAddressCity2: formState.addVendorAddressCity2,
                addVendorAddressState2: formState.addVendorAddressState2,
                addVendorAddressZipcode2: formState.addVendorAddressZipcode2,

                vendorDescription: formState.vendorDescription,
                vendorTelephone: formState.vendorTelephone,
                vendorImage: vendorUrl,

                marketName: formState.marketName,
                addPickupAddressEmail2: formState.email,
                addPickupAddressStreet2: formState.addPickupAddressStreet2,
                addPickupAddressCity2: formState.addPickupAddressCity2,
                addPickupAddressState2: formState.addPickupAddressState2,
                addPickupAddressZipcode2: formState.addPickupAddressZipcode2,

            },
        });

        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, type, value } = event.target;
        setFormState(input => {
            const formState = { ...input }

            switch (type) {
                case 'radio':
                    if (value == "true") { formState[name] = true } else { formState[name] = false }
                    break;
                default:
                    formState[name] = value;
            }
            return formState;
        });

        const filledOutCheck = () => {
            if (!formState.firstName && !formState.lastName && !formState.email && !formState.password) {
                setFilledStatus(true)
            } else {
                setFilledStatus(false)
            }
        }

        filledOutCheck();
    };

    const handleEmailValidation = (e) => {
        e.preventDefault();
        if (formState.email.length == 0) {
            setEmailError(true)
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    const togglePassword = (e) => {
        e.preventDefault();
        setPasswordType(!passwordType)
        setEyeImage(!eyeImage)
    }

    const [loading, setLoading] = useState(false);
    const [userUrl, setUserUrl] = useState("");
    const [vendorUrl, setVendorUrl] = useState("");

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

    function uploadSingleImage(base64, userOrVendor) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadImage", { image: base64 })
            .then((res) => {
                if (userOrVendor == "userImage") {
                    setUserUrl(res.data);
                    alert(`User Image uploaded Successfully.`);
                } else {
                    setVendorUrl(res.data);
                    alert(`Vendor Image uploaded Successfully.`);
                }
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    // Ignore this but dont comment it out
    function uploadMultipleImages(images) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadMultipleImages", { images })
            .then((res) => {
                // setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        const userOrVendor = event.target.name
        console.log(userOrVendor);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64, userOrVendor);
            return;
        }

        const base64s = [];
        for (var i = 0; i < files.length; i++) {
            var base = await convertBase64(files[i]);
            base64s.push(base);
        }
        uploadMultipleImages(base64s);
    };


    // const filledOutCheck = () => {
    //     if (!formState.firstName && !formState.lastName && !formState.email && !formState.password) {
    //         setFilledStatus(true)
    //     } else {
    //         setFilledStatus(false)
    //     }
    // }

    function renderVendorForm() {
        if (formState.vendorStatus == true) {
            return (

                <div className="col-12 mb-3 d-flex flex-column text-start">
                    <label for="businessname" className="form-label signin-label text-md-start ms-md-3">Business Name</label>
                    <input
                        placeholder="Enter business name"
                        name="vendorName"
                        type="text"
                        id="vendorName"
                        onChange={handleChange}
                        value={formState.vendorName}
                        className='form-control'/>

                </div>

                // <>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Business Name"
                //             name="vendorName"
                //             type="text"
                //             id="vendorName"
                //             onChange={handleChange}
                //             value={formState.vendorName}
                //         />
                //     </Form.Group>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Vendor Street Address"
                //             name="addVendorAddressStreet2"
                //             type="text"
                //             id="addVendorAddressStreet2"
                //             onChange={handleChange}
                //             value={formState.addVendorAddressStreet2}
                //         />
                //         <Form.Control
                //             placeholder="City"
                //             name="addVendorAddressCity2"
                //             type="text"
                //             id="addVendorAddressCity2"
                //             onChange={handleChange}
                //             value={formState.addVendorAddressCity2}
                //         />
                //         <Form.Control
                //             placeholder="State"
                //             name="addVendorAddressState2"
                //             type="text"
                //             id="addVendorAddressState2"
                //             onChange={handleChange}
                //             value={formState.addVendorAddressState2}
                //         />
                //         <Form.Control
                //             placeholder="Zip Code"
                //             name="addVendorAddressZipcode2"
                //             type="text"
                //             id="addVendorAddressZipcode2"
                //             onChange={handleChange}
                //             value={formState.addVendorAddressZipcode2}
                //         />
                //     </Form.Group>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Tell us about your company"
                //             name="vendorDescription"
                //             as="textarea"
                //             rows={6}
                //             id="vendorDescription"
                //             onChange={handleChange}
                //             value={formState.vendorDescription}
                //         />
                //     </Form.Group>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Business Phone Number"
                //             name="vendorTelephone"
                //             type="text"
                //             id="vendorTelephone"
                //             onChange={handleChange}
                //             // onBlur={handlePhoneValidation}
                //             value={formState.vendorTelephone}
                //         />
                //     </Form.Group>
                //     <Form.Group>
                //         <Form.Label className='UploadImg mt-4 mb-2'>
                //             <div>
                //                 Upload a picture of your business
                //             </div>
                //             <Form.Control
                //                 id="dropzone-file"
                //                 type="file"
                //                 name='vendorImage'
                //                 onChange={uploadImage}
                //                 className='vendorImage'
                //             />
                //             {vendorUrl ? <img className="user-img-preview preview-img" src={vendorUrl} height={100} width={100} /> : <></>}
                //         </Form.Label>
                //     </Form.Group>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Market Name"
                //             name="marketName"
                //             type="text"
                //             id="marketName"
                //             onChange={handleChange}
                //             value={formState.marketName}
                //         />
                //     </Form.Group>
                //     <Form.Group className="flex-row space-between my-2">
                //         <Form.Control
                //             placeholder="Pick Up Address"
                //             name="addPickupAddressStreet2"
                //             type="text"
                //             id="addPickupAddressStreet2"
                //             onChange={handleChange}
                //             value={formState.addPickupAddressStreet2}
                //         />
                //         <Form.Control
                //             placeholder="City"
                //             name="addPickupAddressCity2"
                //             type="text"
                //             id="addPickupAddressCity2"
                //             onChange={handleChange}
                //             value={formState.addPickupAddressCity2}
                //         />
                //         <Form.Control
                //             placeholder="State"
                //             name="addPickupAddressState2"
                //             type="text"
                //             id="addPickupAddressState2"
                //             onChange={handleChange}
                //             value={formState.addPickupAddressState2}
                //         />
                //         <Form.Control
                //             placeholder="Zip Code"
                //             name="addPickupAddressZipcode2"
                //             type="text"
                //             id="addPickupAddressZipcode2"
                //             onChange={handleChange}
                //             value={formState.addPickupAddressZipcode2}
                //         />
                //     </Form.Group>
                // </>
            )
        }
    }

    return (

        <div className="d-flex justify-content-center align-items-center mt-5">

            <div className='card text-center' style={{ width: '45rem' }}>
                <div className='card-body' >

                    <div className='card-title row login-header mb-5 mt-5'>
                        <h1>Sign up for a free account</h1>
                    </div>

                    <form className="login-form row g-2 input-group" onSubmit={handleFormSubmit}>

                        <div className="col-6 mb-3 d-flex flex-column">
                            <label for="firstname" className="form-label signin-label text-md-start ms-md-3">First name</label>
                            <input
                                placeholder="First name"
                                name="firstName"
                                type="text"
                                id="firstName"
                                onChange={handleChange}
                                value={formState.firstName}
                                required="true"
                                className='form-control' />
                                <Form.Control.Feedback type="invalid">Please add your first name.</Form.Control.Feedback>
                        </div>

                        <div className="col-6 mb-3 d-flex flex-column text-start">
                            <label for="lastname" className="form-label signin-label text-md-start ms-md-3">Last name</label>
                            <input
                                placeholder="Last name"
                                name="lastName"
                                type="text"
                                id="lastName"
                                onChange={handleChange}
                                value={formState.lastName}
                                required="true"
                                className='form-control' />
                                <Form.Control.Feedback type="invalid">Please add your last name.</Form.Control.Feedback>
                        </div>

                        <div className="col-12 mb-3 d-flex flex-column text-start">
                            <label for="email" className="form-label signin-label text-md-start ms-md-3">Email</label>
                            <input
                                placeholder="Email address"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                                onBlur={handleEmailValidation}
                                value={formState.email}
                                required="true"
                                className='form-control' />
                                <Form.Control.Feedback type="invalid">Please enter your email</Form.Control.Feedback>
                            {errorEmailMessage ? <label className="errorMsg emailError mt-3 ms-3">Check your email</label> : ""}
                        </div>

                        <div className="col-12 mb-3 d-flex flex-column text-start">
                            <label for="password" className="form-label signin-label text-md-start ms-md-3">Password</label>
                            <div className="input-group mb-3">
                                <input
                                    placeholder="Password- min 5 characters"
                                    name="password"
                                    type={passwordType ? "text" : "password"}
                                    id="password"
                                    onChange={handleChange}
                                    value={formState.password}
                                    required="true"
                                    className='form-control' /><span className="input-group-text" id="basic-addon1"><button className="togglePwdBtn" onClick={togglePassword} type='button'><img src={eyeImage ? eye : blindeye} /></button></span>
                            </div>
                        </div>


                        <div className="col-12 mb-3 d-flex flex-column text-start">
                            <label for="email" className="form-label signin-label text-md-start ms-md-3 mb-4">Are you a vendor?</label>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name='vendorStatus'
                                    label="Yes"
                                    onChange={handleChange}
                                    required="true"
                                    value="true" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name='vendorStatus'
                                    label="No"
                                    required="true"
                                    onChange={handleChange}
                                    value="false" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    No
                                </label>
                            </div>
                        </div>

                        {renderVendorForm()}

                        <div className="d-grid gap-2 d-md-block mt-4 mb-4">
                            {loading
                                ?
                                <button className="btn btn-secondary signup-pg-btns mt-2" type="submit" id="signup-btn" disabled>Submit</button>
                                :
                                <button className="btn btn-secondary signup-pg-btns mt-2" type="submit" id="signup-btn">Submit</button>
                            }
                            {/* Zhihao approved to remove login button on the Signup modal - can cause user error clicking this instead of signup button */}
                            {/* < Link to="/login">
                                <button id="login-btn" className="btn btn-secondary signup-pg-btns mt-2 ms-3" type="button" >
                                    Login</button>
                            </Link> */}
                        </div>
                    </form>

                </div>
            </div >

        </div >

    );
}

export default Signup;
