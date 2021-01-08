import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";
import {useMutation} from "graphql-hooks";
import {setUserInfo} from "../../states";

const HeaderWrap = styled.header`
    width: 100%;
    padding: 1rem;
    background: #AF0C3E;
    img {
        max-height: 5vh;
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

    return <HeaderWrap>
        <Row>
            <Col s={6} md={4} flexVC px={1}>
                <a href="/">
                    <img
                        draggable="false" alt="Amrita Vishwa Vidyapeetham" className="mr-3"
                        src={require('./../../assets/branding/amrita_vishwa_vidyapeetham_light_logo.png')}
                    />
                    <img
                        draggable="false" alt="BIOCREST"
                        src={require('./../../assets/branding/biocrest_logo_light.png')}
                    />
                </a>
            </Col>
            <Col s={6} md={8} flexVC flexHR>
                <button style={{ background: 'white', border: 'none', fontSize: '15px', padding: '5px 10px' }} onClick={handleLogOut}>Logout</button>
            </Col>
        </Row>
    </HeaderWrap>;

};

export default Header;