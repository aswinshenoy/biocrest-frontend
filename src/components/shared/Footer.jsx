import React from 'react';
import styled from "@emotion/styled";

const FooterWrap = styled.div`
    background: #AF0C3E;
    padding: 3vh 5vw;
    color: #EEE;
`;

const Footer = () => {

    return <FooterWrap>
        <div className="row mx-0">
            <div className="col-md-6 p-1">
                <img
                    alt="Amrita Vishwa Vidyapeetham"
                    className="mr-2"
                    draggable="false"
                    style={{ maxWidth: '30%' }}
                    src={require('../../assets/branding/amrita_vishwa_vidyapeetham_light_logo.png')}
                />
                <div> Copyright &copy; 2020 Amrita Vishwa Vidyapeetham. All Rights Reserved.</div>
            </div>
        </div>

    </FooterWrap>

};

export default Footer;