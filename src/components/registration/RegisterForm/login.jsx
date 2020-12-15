import React, {useState} from "react";
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

const LoginForm = ({ onLogin = () => {} }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    }

    return <form className="py-2" onSubmit={handleSubmit}>
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
        <Row mt={2} p={2}>
            <Col s={8} px={1} flexVC>
                Facing trouble to login?
                <a
                   href="#" title="Get help with login"
                   style={{ color: '#AF0C3E' }}
                   className="font-weight-bold px-1"
                >
                    Get Help
                </a>
            </Col>
            <Col s={4} px={1} flexHR>
                <FormButton
                    text="Login"
                    type="submit"
                    py={3} px={5} round={0}
                />
            </Col>
        </Row>
    </form>

};

export default LoginForm;