import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
// import { ADD_USER } from '../utils/mutations';
import { Form, Button, Dropdown } from 'react-bootstrap';
import './signupForm.css';
import eye from '../assets/eye_icongeek26.png'
import blindeye from '../assets/blind-eye_icongeek26.png'
import NavBar from '../NavBar';
import axios from 'axios';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorEmailMessage, setEmailError] = useState(false);
    const [passwordType, setPasswordType] = useState(false)
    const [eyeImage, setEyeImage] = useState(true)
    const [notFilled, setFilledStatus] = useState(false)
    // const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        // const mutationResponse = await addUser({
        //     variables: {
        //         firstName: formState.firstName,
        //         lastName: formState.lastName,
        //         email: formState.email,
        //         password: formState.password,
        //         address: formState.address,
        //         biography: formState.biography,
        //         phone: formState.phone,
        //         vendorStatus: formState.vendorStatus,
        //         vendorName: formState.vendorName,
        //         vendorDescription: formState.vendorDescription,
        //         pickupLocation: formState.pickupLocation,
        //         vendorTelephone: formState.vendorTelephone,
        //         vendorAddress: formState.vendorAddress,
        //     },
        // });
        // const token = mutationResponse.data.addUser.token;
        // Auth.login(token);
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

    const togglePassword = () => {
        setPasswordType(!passwordType)
        setEyeImage(!eyeImage)
    }

    const [loading, setLoading] = useState(false);
    // const [url, setUrl] = useState("");

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
    //     setLoading(true);
    //     axios
    //         .post("http://localhost:3000/uploadImage", { image: base64 })
    //         .then((res) => {
    //             setUrl(res.data);
    //             alert(`Image uploaded Succesfully. Url is ${url}`);
    //         })
    //         .then(() => setLoading(false))
    //         .catch(console.log);
    // }

    // function uploadMultipleImages(images) {
    //     setLoading(true);
    //     axios
    //         .post("http://localhost:3000/uploadMultipleImages", { images })
    //         .then((res) => {
    //             setUrl(res.data);
    //             alert("Image uploaded Succesfully");
    //         })
    //         .then(() => setLoading(false))
    //         .catch(console.log);
    // }

    // const uploadImage = async (event) => {
    //     const files = event.target.files;
    //     console.log(files.length);

    //     if (files.length === 1) {
    //         const base64 = await convertBase64(files[0]);
    //         uploadSingleImage(base64);
    //         return;
    //     }

    //     const base64s = [];
    //     for (var i = 0; i < files.length; i++) {
    //         var base = await convertBase64(files[i]);
    //         base64s.push(base);
    //     }
    //     uploadMultipleImages(base64s);
    // };


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
                <>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Business Name"
                            name="vendorName"
                            type="text"
                            id="vendorName"
                            onChange={handleChange}
                            value={formState.vendorName}
                        />
                    </Form.Group>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Tell us about your products"
                            name="vendorDescription"
                            as="textarea"
                            id="vendorDescription"
                            onChange={handleChange}
                            value={formState.vendorDescription}
                        />
                    </Form.Group>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Pick up Address"
                            name="pickupLocation"
                            type="text"
                            id="pickupLocation"
                            onChange={handleChange}
                            value={formState.pickupLocation}
                        />
                    </Form.Group>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Pick Up Address"
                            name="pickupLocation"
                            type="text"
                            id="pickupLocation"
                            onChange={handleChange}
                        // value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="City"
                            name="pickupCity"
                            type="text"
                            id="pickupCity"
                            onChange={handleChange}
                        // value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="State"
                            name="pickupState"
                            type="text"
                            id="pickupState"
                            onChange={handleChange}
                        // value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="Zip Code"
                            name="pickupZipCode"
                            type="text"
                            id="pickupZipCode"
                            onChange={handleChange}
                        // value={formState.vendorAddress}
                        />
                    </Form.Group>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Business Phone Number"
                            name="vendorTelephone"
                            type="text"
                            id="vendorTelephone"
                            onChange={handleChange}
                            // onBlur={handlePhoneValidation}
                            value={formState.vendorTelephone}
                        />
                    </Form.Group>
                    <Form.Group className="flex-row space-between my-2">
                        <Form.Control
                            placeholder="Business Address"
                            name="vendorAddress"
                            type="text"
                            id="vendorAddress"
                            onChange={handleChange}
                            value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="City"
                            name="vendorCity"
                            type="text"
                            id="vendorAddress"
                            onChange={handleChange}
                            value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="State"
                            name="vendorState"
                            type="text"
                            id="vendorAddress"
                            onChange={handleChange}
                            value={formState.vendorAddress}
                        />
                        <Form.Control
                            placeholder="Zip Code"
                            name="vendorZipCode"
                            type="text"
                            id="vendorAddress"
                            onChange={handleChange}
                            value={formState.vendorAddress}
                        />
                    </Form.Group>
                </>
            )
        }
    }

    return (
        <div className="container signup-pg">
            <NavBar />
            <Form.Label className='signup-header'>Sign up for a free account</Form.Label>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="First name"
                        name="firstName"
                        type="text"
                        id="firstName"
                        onChange={handleChange}
                        value={formState.firstName}
                    />
                </Form.Group>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Last name"
                        name="lastName"
                        type="text"
                        id="lastName"
                        onChange={handleChange}
                        value={formState.lastName}
                    />
                </Form.Group>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Email address"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleEmailValidation}
                        value={formState.email}
                    />
                    {errorEmailMessage ? <label className="errorMsg emailError">Check your email</label> : ""}
                </Form.Group>
                <Form.Group className="d-flex flex-row space-between my-2">
                    <Form.Control
                        placeholder="Password"
                        name="password"
                        type={passwordType ? "text" : "password"}
                        id="password"
                        onChange={handleChange}
                        value={formState.password}
                    />
                    <Button className="togglePwdBtn" onClick={togglePassword}>
                        <img src={eyeImage ? eye : blindeye} />
                    </Button>
                </Form.Group>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Address"
                        name="address"
                        type="text"
                        id="address"
                        onChange={handleChange}
                        value={formState.address}
                    />
                </Form.Group>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Tell us about you"
                        name="biography"
                        as="textarea"
                        id="biography"
                        onChange={handleChange}
                        value={formState.vendorAddress}
                    />
                </Form.Group>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Phone Number"
                        name="phone"
                        type="phone"
                        id="phone"
                        onChange={handleChange}
                        // onBlur={handlePhoneValidation}
                        value={formState.phone}
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label className='UploadImg mt-4 mb-5'>
                        <div>
                            Upload
                        </div>
                        <Form.Control
                            id="dropzone-file"
                            type="file"
                            name='vendorImage'
                            onChange={uploadImage}
                            className='vendorImage'
                        />
                    </Form.Label>
                </Form.Group> */}
                <Form.Group className="flex-row space-between my-2">
                    <Form.Label htmlFor="vendorStatus">Are you a vendor?</Form.Label>
                    <Form.Check
                        type="radio"
                        name='vendorStatus'
                        label="Yes"
                        onChange={handleChange}
                        value="true"
                    />
                    <Form.Check
                        type="radio"
                        name='vendorStatus'
                        label="No"
                        onChange={handleChange}
                        value="false"
                    />
                </Form.Group>
                {renderVendorForm()}
                <Form.Group className="flex-row flex-end">
                    {loading ? (
                        <Button
                            id="signup-btn"
                            className="signup-pg-btns btn-primary btn"
                            type="submit"
                            disabled
                        >
                            Register
                        </Button>
                    ) : (
                        <Button
                            id="signup-btn"
                            className="signup-pg-btns btn-primary btn"
                            type="submit"
                        // disabled={notFilled}
                        >
                            Register
                        </Button>
                    )}
                    <Link to="/login">
                        <Button id="login-btn" className='signup-pg-btns btn-secondary btn'>Login</Button>
                    </Link>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Signup;
