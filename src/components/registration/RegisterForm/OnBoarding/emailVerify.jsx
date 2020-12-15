import React, {useState} from 'react';
import OtpInput from 'react-otp-input';
import styled from "@emotion/styled";
import {Button, Col, Row} from "srx";

const OTPInput = styled(OtpInput)`
    input {
        padding: 0.5rem;
        margin-right: 10px;
        font-size: 22px;
        width: 50px!important;
        border: 2px solid white!important;
        &:focus {
          outline: none!important;
          border-color: #AF0C3E!important;
        }
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

const EmailVerifyCard = ({
    profile, onVerify = () => {}
}) => {

    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onVerify({ ...profile, emailVerified: true });
    };

    return <form onSubmit={handleSubmit}>
        {profile?.emailVerified ?
        <React.Fragment>
            <h2 className="font-weight-bold text-success">Email Verified</h2>
            <p className="mb-5" style={{ maxWidth: '550px' }}>
                Thank You. We have already verified your email -  <span style={{ color: '#AF0C3E' }}>{profile?.email}</span>.
                If you would like to change this email, you could do that later.
            </p>
        </React.Fragment> :
        <React.Fragment>
            <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="mb-3">Let's Verify Your Email</h2>
            <p style={{ maxWidth: '600px' }}>
                We have already send you a code to
                <span className="px-1" style={{ color: '#AF0C3E' }}>{profile?.email}</span>
                <button className="plain-button text-primary font-weight-bold pl-0 pr-1">(Change)</button>,
                please check your inbox and enter the code below to verify your email.
            </p>
            <div className="px-2 py-3">
                <div className="font-weight-bold mb-2">Enter Code</div>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span />}
                    isInputNum
                />
                <div className="mt-4">
                    Didn't get a code?
                    <button className="plain-button px-1 font-weight-bold" style={{ color: '#AF0C3E' }}>Resend Email</button>
                </div>
            </div>
        </React.Fragment>}
        <Row>
            <Col md={8} />
            {(otp.length === 6 || profile.emailVerified) && <Col md={4} p={1} flexHR>
                <FormButton
                    text="Continue"
                    type="submit" fw
                    py={4} px={5} round={0}
                />
            </Col>}
        </Row>
    </form>;

};

export default EmailVerifyCard;