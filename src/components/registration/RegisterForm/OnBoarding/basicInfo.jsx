import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Button, Col, Row, TextInput} from "srx";

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


const BasicInfoForm = ({
    profile: profileProp, onSave = () => {},
}) => {

    const [profile, setProfile] = useState(profileProp);
    const [valueChanged, setValueChanged] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(profile);
    };

    useEffect(() => {
        if(confirmPass.length > 0 && !profile?.password.startsWith(confirmPass)){
            setPasswordMismatch(true)
        } else {
            setPasswordMismatch(false)
        }
    }, [confirmPass])

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>About You</h2>
        <Row>
            <Col md={6} p={1}>
                <FormInput
                    label="Name"
                    name="name"
                    title="Please enter your name"
                    value={profile?.name}
                    onChange={(name) => { setValueChanged(true); setProfile({...profile, name}) }}
                    placeholder="Enter Your Name"
                    alwaysShowLabel
                    isRequired
                />
            </Col>
            <Col md={6} p={1}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={profile?.email}
                    onChange={(email) => { setValueChanged(true); setProfile({...profile, email}) }}
                    autoComplete="email"
                    placeholder="Enter Your Email"
                    alwaysShowLabel
                    isRequired
                />
            </Col>
            <Col md={6} p={1}>
                <FormInput
                    label="Password"
                    name="new-password"
                    type="password"
                    value={profile?.password}
                    onChange={(password) => { setProfile({...profile, password}); setValueChanged(true); setPasswordChanged(true) }}
                    autoComplete="new-password"
                    placeholder="Enter Your Password"
                    alwaysShowLabel
                    isRequired
                />
            </Col>
            {passwordChanged &&
            <Col md={6} p={1}>
                <FormInput
                    label="Confirm Password"
                    name="confirm-password"
                    type="password"
                    value={confirmPass}
                    onChange={setConfirmPass}
                    autoComplete="new-password"
                    placeholder="Confirm Your Password"
                    alwaysShowLabel
                    isRequired
                    errorText={passwordMismatch ? 'Passwords do not match' : null}
                />
            </Col>}
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                <FormButton
                    text={valueChanged ? "Save" : "Continue"}
                    type="submit" fw
                    py={4} px={5} round={0}
                />
            </Col>
        </Row>
    </form>

};

export default BasicInfoForm;