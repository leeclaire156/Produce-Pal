import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Container } from 'react-bootstrap';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        const mutationResponse = await addUser({
            variables: {
                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                password: formState.password,
                address: formState.address,
                biography: formState.biography,
                phone: formState.phone,
                vendorStatus: formState.vendorStatus,
                vendorName: formState.vendorName,
                vendorDescription: formState.vendorDescription,
                pickupLocation: formState.pickupLocation,
                vendorTelephone: formState.vendorTelephone,
                vendorAddress: formState.vendorAddress,
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
                // case 'number':
                //     formState[name] = Number(value);
                //     break;
                case 'radio':
                    if (value == "true") { formState[name] = true } else { formState[name] = false }
                    break;
                default:
                    formState[name] = value;
            }
            return formState;
        });
    };

    function renderVendorForm() {
        if (formState.vendorStatus == true) {
            return (
                <>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="vendorName">Vendor Name:</label>
                        <input
                            placeholder="Last"
                            name="vendorName"
                            type="vendorName"
                            id="vendorName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="vendorDescription">Vendor Description:</label>
                        <input
                            placeholder="Last"
                            name="vendorDescription"
                            type="vendorDescription"
                            id="vendorDescription"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="pickupLocation">Pick Up Location:</label>
                        <input
                            placeholder="Last"
                            name="pickupLocation"
                            type="pickupLocation"
                            id="pickupLocation"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="vendorTelephone">Business Phone Number:</label>
                        <input
                            placeholder="Last"
                            name="vendorTelephone"
                            type="vendorTelephone"
                            id="vendorTelephone"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="vendorAddress">Business Address:</label>
                        <input
                            placeholder="Last"
                            name="vendorAddress"
                            type="vendorAddress"
                            id="vendorAddress"
                            onChange={handleChange}
                        />
                    </div>
                </>
            )
        }
    }

    return (
        <div className="container my-1">
            <Link to="/login">← Go to Login</Link>

            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        placeholder="First"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        placeholder="Last"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="address">Address:</label>
                    <input
                        placeholder="Address"
                        name="Address"
                        type="text"
                        id="Address"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="biography">Biography:</label>
                    <textarea
                        message="Write something"
                        name="Biography"
                        // type="lastName"
                        id="Biography"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        placeholder="Last"
                        name="phone"
                        type="phone"
                        id="phone"
                        onChange={handleChange}
                    />
                </div>
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
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
