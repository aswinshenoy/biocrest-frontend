import React, {useState} from 'react';
import styled from "@emotion/styled";
import classNames from 'classnames';
import {Col, Row} from "srx";
import { useMutation } from 'graphql-hooks'

import RegisterForm from "./register";
import LoginForm from "./login";
import SocialLogin from "./socialLogin";

import RegistrationSideCover from "../SideCover";
import {LOGIN_MUTATION, REGISTER_MUTATION} from "../../../graphql/queries/user";
import {setUserInfo} from "../../../states";

const TabSwitchers = styled.div`
    button {
      font-size: 1.5rem;
      font-weight: 500;
      padding: 0.75rem;
      border-bottom: 3px solid #AEAEAE;
      width: 50%;
    }
    .active {
      border-bottom: 3px solid #D00846!important;
    }
`;


const RegisterPageWrapper = styled.main`
  width: 100%;
  .container-lg{
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      max-width: 900px;
  }
`;


const RegistrationForm = () => {

    const [currentTab, setTab] = useState('register');

    const [isRegistering, setRegistering] = useState(false);
    const [error, setError] = useState(null);

    const [registerUser] = useMutation(REGISTER_MUTATION);
    const [loginUser] = useMutation(LOGIN_MUTATION);

    const handleSignIn = ({ email, password }) => {
        loginUser({ variables: { username: email, password }}).then(({ data, error}) => {
            setRegistering(false);
            if(data?.authenticateUser?.success){
                setUserInfo({
                    ...data.authenticateUser.user,
                });
            } else {
                setError(error);
            }
        });
    };

    const handleRegisterFormSubmit = (p) => {
        setRegistering(true)
        registerUser({
            variables: { input: { email: p.email, password: p.password, name: p.name} }
        }).then(({ data, error}) => {
            if(data?.register?.success){
                handleSignIn({ email: p.email, password: p.password });
            } else {
                setRegistering(false);
                setError(error)
            }
        });
    };

    const renderError = () =>
    <div className="alert-danger mt-3 p-3">
        {error?.graphQLErrors?.length > 0 ?
            <div>
                {error.graphQLErrors[0].message}
                <span className="d-block"> code: {error.graphQLErrors[0].code}</span>
            </div> :
            <div>
                An unknown error occurred. Try Again.
            </div>
        }
    </div>

    return <RegisterPageWrapper>
        <div className="container-lg px-0">
            <Row className="w-100">
                <Col md={6} p={0}>
                    <RegistrationSideCover />
                </Col>
                <Col md={6} className="px-0 px-md-4 pb-md-0 pb-5">
                    <section>
                        <TabSwitchers>
                            <button
                                aria-label="Register for Biocrest"
                                onClick={() => { setError(null); setTab('register')}} title="Register for Biocrest"
                                className={classNames("plain-button", {'active': currentTab === 'register'})}
                            >
                                Register
                            </button>
                            <button
                                aria-label="Login with your Biocrest account"
                                onClick={() =>  { setError(null); setTab('login')}} title="Login with your Biocrest account"
                                className={classNames("plain-button", {'active': currentTab === 'login'})}
                            >
                                Login
                            </button>
                        </TabSwitchers>
                        <div className="position-relative px-3">
                            {isRegistering &&
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: `rgba(0,0,0,0.85)`
                                }}
                                className="d-flex align-items-center text-light justify-content-center text-center"
                            >
                                <h3>Registering</h3>
                            </div>}
                            {error && renderError()}
                            {currentTab === 'register' ?
                                <RegisterForm onRegister={handleRegisterFormSubmit} /> :
                                <LoginForm onLogin={handleSignIn} />}
                        </div>
                        <div className="p-2">
                            <SocialLogin />
                        </div>
                    </section>
                </Col>
            </Row>
        </div>
    </RegisterPageWrapper>;

};

export default RegistrationForm;