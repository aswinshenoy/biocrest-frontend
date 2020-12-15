import React, {useState} from 'react';
import styled from "@emotion/styled";
import classNames from 'classnames';
import {Col, Row} from "srx";

import RegisterForm from "./register";
import LoginForm from "./login";
import SocialLogin from "./socialLogin";
import OnBoarding from "./OnBoarding";

import RegistrationSideCover from "../SideCover";

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


const RegistrationForm = () => {

    const [currentTab, setTab] = useState('register');

    const [profile, setProfile] = useState(null)
    const [showOnBoarding, setShowOnBoarding] = useState(false);

    const handleRegisterFormSubmit = (p) => {
        setProfile(p);
        setShowOnBoarding(true);
    };

    const handleOnBoarding = (p) => {

    };

    const renderForms = () =>
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
                            onClick={() => setTab('register')} title="Register for Biocrest"
                            className={classNames("plain-button", {'active': currentTab === 'register'})}
                        >
                            Register
                        </button>
                        <button
                            aria-label="Login with your Biocrest account"
                            onClick={() => setTab('login')} title="Login with your Biocrest account"
                            className={classNames("plain-button", {'active': currentTab === 'login'})}
                        >
                            Login
                        </button>
                    </TabSwitchers>
                    <div className="px-3">
                        {currentTab === 'register' ?
                        <RegisterForm onRegister={handleRegisterFormSubmit} /> :
                        <LoginForm />}
                    </div>
                    <div className="p-2">
                        <SocialLogin />
                    </div>
                </section>
            </Col>
        </Row>
    </div>;

    return showOnBoarding ? <OnBoarding profile={profile} onComplete={handleOnBoarding} /> : renderForms();

};

export default RegistrationForm;