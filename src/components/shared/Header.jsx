import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";
import {useMutation} from "graphql-hooks";
import {setUserInfo} from "../../states";
import ViewAuthenticator from "./ViewAuthenticator";

const HeaderWrap = styled.header`
    width: 100%;
    padding: 0.25rem 1rem;
    background: #a02541;
    box-shadow: 2px 3px 8px rgba(0,0,0,0.35);
    img {
        max-height: 8vh;
    }
`;

const Header = () => {

    const LOGOUT_USER = `mutation { 
        logoutUser
    }`;
    const [logoutUser] = useMutation(LOGOUT_USER);

    const handleLogOut = () => {
        logoutUser().then(({ data, error }) => {
            setUserInfo(null);
        });
    };

    const renderLogoutButton = () =>
    <button
        style={{ background: 'white', border: 'none', fontSize: '15px', padding: '5px 10px' }}
        onClick={handleLogOut}
    >
        Logout
    </button>;

    const renderLoginButton = () =>
    <a
        style={{ background: 'white', border: 'none', fontSize: '15px', padding: '5px 10px' }}
        href="/login"
    >
        Login
    </a>


               return <HeaderWrap>
        <Row>
            <Col s={6} md={4} flexVC px={1}>
                <a href="/">
                    <img
                        draggable="false" alt="BIOCREST"
                        src={require('./../../assets/branding/biocrest_logo_light.png')}
                    />
                </a>
            </Col>
            <Col s={6} md={8} flexVC flexHR>
                <ViewAuthenticator
                    renderAuth={() => renderLogoutButton()}
                    renderJudge={() => renderLogoutButton()}
                    renderAdmin={() => renderLogoutButton()}
                    renderPublic={() => renderLoginButton()}
                />
            </Col>
        </Row>
    </HeaderWrap>;

};

export default Header;