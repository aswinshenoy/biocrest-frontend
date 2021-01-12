import React, {useState} from "react";
import {Button, Col, Row, TextInput} from "srx";
import styled from "@emotion/styled";
import Fade from "react-reveal/Fade";

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

const LoginForm = ({ onLogin = () => {}, onReset = () => {} }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    }

    return <form className="py-3 h-100" onSubmit={handleSubmit}>
        <Fade up delay={100}>
            <FormInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                placeholder="Enter Your Email"
                alwaysShowLabel
                isRequired
            />
        </Fade>
        <Fade up delay={200}>
            <FormInput
                label="Password"
                name="current-password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
                placeholder="Enter Your Password"
                alwaysShowLabel
                isRequired
            />
        </Fade>
        <Fade up delay={300}>
            <Row mt={2} p={2}>
                <Col md={8} p={2} flexVC>
                    <div className="pr-2 pb-3" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                        Facing trouble to login?
                        <button
                           onClick={onReset} title="Get help with login"
                           style={{ color: '#AF0C3E' }} type="button"
                           className="font-weight-bold plain-button px-1"
                        >
                            Get Help
                        </button>
                    </div>
                </Col>
                <Col md={4} p={1} flexHR>
                    <FormButton
                        key="login-button"
                        text="Login"
                        type="submit" fw
                        py={4} px={5} round={0}
                    />
                </Col>
            </Row>
        </Fade>
    </form>

};

export default LoginForm;