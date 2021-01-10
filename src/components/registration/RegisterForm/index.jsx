import React, {useState} from 'react';
import styled from "@emotion/styled";
import classNames from 'classnames';
// import {Col, Row} from "srx";
import { useMutation } from 'graphql-hooks'
import Fade from "react-reveal/Fade";

import RegisterForm from "./register";
import LoginForm from "./login";
// import SocialLogin from "./socialLogin";

import {LOGIN_MUTATION, REGISTER_MUTATION} from "../../../graphql/queries/user";
import {setUserInfo} from "../../../states";

const TabSwitchers = styled.div`
    button {
      font-size: 1.75rem;
      font-weight: 500;
      padding: 0.75rem;
      border-bottom: 3.5px solid #AEAEAE;
      width: 50%;
    }
    .active {
      color: #AF0C3E;
      border-bottom: 3.5px solid #AF0C3E!important;
    }
`;


const RegisterPageWrapper = styled.main`
  width: 100%;
  background-color: #340853;
  background-size: cover;
  .container-lg{
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      max-width: 900px;
  }
`;


const RegistrationForm = ({ type = 'register' }) => {

    const [currentTab, setTab] = useState(type);

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

    return <RegisterPageWrapper style={{ backgroundImage: `url(${require('../../../assets/branding/login_page_cover.jpg')})`}}>
        <div className="d-block d-md-flex align-items-center justify-content-center h-100 px-0" style={{ minHeight: '100vh' }}>
            <div>
                <div className="d-block d-md-none text-light text-center p-4">
                    <a rel="noreferrer nofollow" href="https://amrita.edu/biocrest">
                        <img
                            alt="Biocrest" draggable="false"
                            style={{ maxHeight: '64px' }}
                            src={require('../../../assets/branding/biocrest_logo_light.png')}
                        />
                    </a>
                </div>
                <Fade up timeout={500}>
                    <section className="bg-white rounded-top shadow" style={{ width: '450px', maxWidth: '100%', minHeight: '500px' }}>
                        {/*<div className="d-block d-md-none ">*/}
                        {/*    <img*/}
                        {/*        alt="Amrita" draggable="false"*/}
                        {/*        src={require('../../../assets/branding/cover.jpg')}*/}
                        {/*    />*/}
                        {/*</div>*/}
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
                        <div className="position-relative p-4">
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
                                <LoginForm onLogin={handleSignIn} />
                            }
                        </div>
                        {/*<div className="p-2">*/}
                        {/*    <SocialLogin />*/}
                        {/*</div>*/}
                    </section>
                    <div style={{ background: '#AF0C3E' }} className="d-block rounded-bottom text-light text-center p-3">
                        <a rel="noreferrer nofollow" href="https://amrita.edu/biocrest">
                            <img
                                alt="Amrita Vishwa Vidyapeetham"
                                style={{ maxHeight: '64px' }} draggable="false"
                                src={require('../../../assets/branding/amrita_vishwa_vidyapeetham_light_logo.png')}
                            />
                        </a>
                    </div>
                </Fade>
            </div>
        </div>
    </RegisterPageWrapper>;

};

export default RegistrationForm;