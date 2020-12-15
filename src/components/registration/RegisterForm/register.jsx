import React, {useEffect, useState} from 'react';
import {Button, Col, Row, TextInput} from "srx";
import styled from "@emotion/styled";


const FormInput = styled(TextInput)`
    input { 
      font-size: 15px!important; 
      border: 1px solid #AF0C3E!important; 
      margin: 1px;
      padding: 8px 10px; 
      margin-top: 0.35rem!important;
      &:focus {
        border: 2px solid #AF0C3E!important;
        margin: 0;
      }
    }
    label { 
      font-size: 12px; 
      font-weight: 500!important; 
    }
`;

const FormButton = styled(Button)`
    color: white!important;
    background: #AF0C3E!important;
    transition: all 0.25s ease-in;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.3);
    &:hover, &:focus{
       box-shadow: none!important;
       transition: all 0.25s ease-in;
    }
`;

const RegisterForm = ({ onRegister = () => {} }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(passConfirm!==password) setPasswordMismatch(true);
        else {
            onRegister({ name, email, password });
        }
    };

    useEffect(() => {
        if(passConfirm.length > 0 && !password.startsWith(passConfirm)){
            setPasswordMismatch(true)
        } else {
            setPasswordMismatch(false)
        }
    }, [passConfirm])

    return <form className="py-2" onSubmit={handleSubmit}>
        <FormInput
            label="Name"
            name="name"
            title="Please enter your name"
            value={name}
            onChange={setName}
            placeholder="Enter Your Name"
            alwaysShowLabel
            isRequired
        />
        <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={setEmail}
            placeholder="Enter Your Email"
            alwaysShowLabel
            isRequired
        />
        <FormInput
            label="Password"
            name="new-password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder="Enter Your Password"
            alwaysShowLabel
            isRequired
        />
        <FormInput
            label="Confirm Password"
            name="repeat-password"
            type="password"
            value={passConfirm}
            onChange={setPassConfirm}
            placeholder="Confirm Your Password"
            autoComplete="new-password"
            alwaysShowLabel
            isRequired
            errorText={passwordMismatch ? 'Passwords do not match' : null}
        />
        <Row mt={2} p={2}>
            <Col md={8} p={1} flexVC>
                <div className="pr-2" style={{ fontSize: '10px', lineHeight: '1.6' }}>
                    By registering for BIOCREST 2021, you accept our
                    <span className="d-inline-block">
                        <a href="/terms" className="font-weight-bold pr-1">Terms & Conditions</a> and
                        <a href="/privacy" className="font-weight-bold pl-1">Privacy Policy</a>.
                    </span>
                </div>
            </Col>
            <Col md={4} p={1} flexHR>
                <FormButton
                    text="Register"
                    type="submit"
                    py={3} px={5} round={0}
                    isDisabled={passwordMismatch}
                />
            </Col>
        </Row>
    </form>

};

export default RegisterForm;