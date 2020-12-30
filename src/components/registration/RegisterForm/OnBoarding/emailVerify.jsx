import React, {useEffect, useState} from 'react';
import OtpInput from 'react-otp-input';
import styled from "@emotion/styled";
import {Button, Col, Row} from "srx";
import {useMutation} from "graphql-hooks";

import {RESEND_EMAIL_MUTATION, VERIFY_EMAIL_MUTATION} from "../../../../graphql/queries/user";

const OTPInput = styled(OtpInput)`
    input {
        padding: 0.5rem;
        margin-right: min(5px, 2vw);
        font-size: calc(0.8rem + 0.8vw);
        width: min(50px, 13vw)!important;
        height: min(50px, 13vw)!important;
        border: ${({ success, failed }) => 
            failed ? `2px solid red!important` :
            success ? `2px solid green!important` 
            : `2px solid white!important` 
        };
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
    profile, onVerify = () => {}, onRequestChange = () => {},
}) => {

    const [otp, setOtp] = useState('');
    const [isVerified, setVerified] = useState(profile?.emailVerified);

    const [verifyOTP] = useMutation(VERIFY_EMAIL_MUTATION);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isVerified){
            onVerify({ ...profile, emailVerified: true });
        }
    };

    const [requestNewEmail] = useMutation(RESEND_EMAIL_MUTATION);
    const handleRequestNewMail = (e) => {
        e.preventDefault();
        requestNewEmail().then(({ data, error }) => {
            if(data?.resendConfirmationEmail){
                console.log('new mail send')
            }
        })
    };

    useEffect(() => {
        if(!isVerified && otp.length >= 6){
            verifyOTP({ variables: { otp }}).then(({ data, error }) => {
                if(data?.verifyEmail){
                    setVerified(true);
                } else {
                    setVerified(false);
                }
            })
        }
    }, [otp]);

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
                <button
                    onClick={onRequestChange}
                    type="button"
                    className="plain-button text-primary font-weight-bold pl-0 pr-1"
                >
                    (Change)
                </button>,
                please check your inbox and enter the code below to verify your email.
            </p>
            <div className="px-2 py-3">
                <div className="font-weight-bold mb-2">Enter Code</div>
                <OTPInput
                    success={isVerified}
                    failed={isVerified===false&&otp.length===6}
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span />}
                    isInputNum
                />
                <div className="mt-4">
                    Didn't get a code?
                    <button
                        onClick={handleRequestNewMail}
                        type="button"
                        className="plain-button px-1 font-weight-bold"
                        style={{ color: '#AF0C3E' }}
                    >
                        Resend Email
                    </button>
                </div>
            </div>
        </React.Fragment>}
        <Row>
            <Col md={8} />
            {(isVerified) && <Col md={4} p={1} flexHR>
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