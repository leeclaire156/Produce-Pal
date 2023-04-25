import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
// import { LOGIN } from '../utils/mutations';
import Auth from '../../utils/auth';
import './LoginForm.css';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import eye from '../assets/eye_icongeek26.png'
import blindeye from '../assets/blind-eye_icongeek26.png'

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorEmailMessage, setEmailError] = useState(false);
    const [passwordType, setPasswordType] = useState(false)
    const [image, setImage] = useState(true)
    // const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // const { data } = await login({
            //     variables: { ...formState },
            // });

            // Auth.login(data.login.token);
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
        <div className="container login-pg">
            <Form.Label className='login-header'>Login to your account</Form.Label>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="flex-row space-between my-2">
                    <Form.Control
                        placeholder="Email address"
                        name="email"
                        type="email"
                        id="login-email"
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
                        id="login-password"
                        onChange={handleChange}
                        value={formState.password}
                    />
                    <Button className="togglePwdBtn" onClick={togglePassword}>
                        <img src={image ? eye : blindeye} />
                    </Button>
                </Form.Group>
                {/* {error ? (
                    <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                ) : null} */}
                <Form.Group className="flex-row flex-end">
                    <Button id="login-btn" className="login-pg-btns btn-primary btn" type="submit">Login</Button>
                    <Link to="/signup">
                        <Button id="signup-btn" className="signup-btn login-pg-btns btn-secondary btn">Register</Button>
                    </Link>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Login;
