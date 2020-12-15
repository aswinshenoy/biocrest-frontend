import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Col, Row, TextInput} from "srx";
import OtpInput from "react-otp-input";

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

const PhoneVerifyCard = ({
   profile, onVerify = () => {}
}) => {

   const [phone, setPhone] = useState(profile.phone ? profile.phone : '+91');
   const [phoneEntered, setPhoneEntered] = useState(false);
   const [otp, setOtp] = useState('');

   const handleVerify = (e) => {
      e.preventDefault();
      onVerify({ ...profile, phone, phoneVerified: true });
   };

   const handleEnter = (e) => {
      e.preventDefault();
      setPhoneEntered(true);
   }

   return <div>
      {profile?.phoneVerified ?
         <React.Fragment>
            <h2 className="font-weight-bold text-success">Phone Verified</h2>
            <p className="mb-5" style={{ maxWidth: '550px' }}>
               Thank You. We have already verified your phone number -  <span style={{ color: '#AF0C3E' }}>{profile?.phone}</span>.
               If you would like to change this number, you could do that later.
            </p>
            <Row>
               <Col md={8} />
               <Col md={4} p={1} flexHR>
                  <FormButton
                      onClick={() => onVerify(profile)}
                      text="Continue" fw
                      py={4} px={5} round={0}
                  />
               </Col>
            </Row>
         </React.Fragment> :
         phoneEntered ? <React.Fragment>
          <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="mb-3">Let's Verify Your Phone Number</h2>
          <p style={{ maxWidth: '600px' }}>
             We have send you a code via SMS to
             <span className="px-1" style={{ color: '#AF0C3E' }}>{phone}</span>
             <button onClick={() => setPhoneEntered(false)} className="plain-button text-primary font-weight-bold pl-0 pr-1">(Change)</button>,
             please check your messages and enter the code below to verify your phone.
          </p>
          <form onSubmit={handleVerify}>
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
                   <button className="plain-button px-1 font-weight-bold" style={{ color: '#AF0C3E' }}>Resend SMS</button>
                </div>
             </div>
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
          </form>
       </React.Fragment> :
       <React.Fragment>
          <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="mb-3">Your Phone Number</h2>
          <p style={{ maxWidth: '600px' }}>
             We need to have your WhatsApp number to communicate important updates about the event.
          </p>
          <form onSubmit={handleEnter}>
             <div className="p-1">
                <div style={{ maxWidth: '450px' }}>
                   <FormInput
                       label="Phone Number"
                       name="phone"
                       title="Please enter your phone number"
                       value={phone}
                       onChange={setPhone}
                       placeholder="Enter Your Phone Number"
                       alwaysShowLabel
                       isRequired
                   />
                </div>
                <Row>
                   <Col md={8} />
                   <Col md={4} p={1} flexHR>
                   {(phone?.length===13) && <FormButton
                       text="Continue"
                       type="submit"
                       py={4} px={5} round={0}
                   />}
                   </Col>
                </Row>
             </div>
          </form>
       </React.Fragment>
      }
   </div>

};

export default PhoneVerifyCard;