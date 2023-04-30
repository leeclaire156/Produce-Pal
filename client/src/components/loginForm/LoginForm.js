import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
// import './LoginForm.css';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import eye from '../assets/eye_icongeek26.png'
import blindeye from '../assets/blind-eye_icongeek26.png'

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorEmailMessage, setEmailError] = useState(false);
    const [passwordType, setPasswordType] = useState(false)
    const [image, setImage] = useState(true)
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
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
        setImage(!image)
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 pb-5 mb-5">

            <div className='card text-center mb-5 pb-5' style={{ width: '30rem' }}>
                <div className='card-body' >

                    <div className='card-title row login-header mb-5 mt-5'>
                        <h1>Login to your account</h1>
                    </div>

                    <form className="login-form row g-2 input-group" onSubmit={handleFormSubmit}>
                        <div className="col-sm-12 mb-3">
                            <label for="email" className="form-label signin-label mb-3">Email</label>
                            <input className="form-control" required="required" placeholder="Email address"
                                name="email"
                                type="email"
                                id="login-email"
                                onChange={handleChange}
                                onBlur={handleEmailValidation}
                                value={formState.email} />
                            {errorEmailMessage ? <label className="errorMsg emailError mt-3 mb-3">Check your email</label> : ""}
                        </div>
                        <div className="col-sm-12">
                            <label for="password" className="form-label signin-label mb-3">Password</label>

                            <div className="input-group mb-3">
                                <input className="form-control" required="required" placeholder="Password"
                                    name="password"
                                    type={passwordType ? "text" : "password"}
                                    id="login-password"
                                    onChange={handleChange}
                                    value={formState.password} aria-describedby="basic-addon1" /><span className="input-group-text" id="basic-addon1"><button className="togglePwdBtn" onMouseEnter={togglePassword} onMouseLeave={togglePassword}><img src={image ? eye : blindeye} /></button></span>
                            </div>
                        </div>

                        <div className="d-grid gap-2 d-md-block mt-4 mb-4">
                            <button className="btn btn-primary mt-2" type="submit" id="login-btn">Submit</button>
                            <Link to="/signup">
                                <button id="signup-btn" className="btn btn-primary mt-2 ms-3" type="button" >
                                    Register</button>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default Login;
