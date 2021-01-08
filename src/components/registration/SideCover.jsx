import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";

const SideCoverContainer = styled.section`
    background: #AF0C3E;
    color: white;
    padding: 3.5vh 3vw;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 30vh;
    height: 100%;
    user-select: none;
    .branding-top-bar {
        position: absolute;
        top: 0;
        left: 0;
        padding: 3.5vh 1vw;
        width: 100%;
        img {
            max-height: 45px;
        }
    }
    h3 {
        font-weight: 500;
    }
    @media (min-width: 768px) {
       min-height: 70vh;
    }
`;


const RegistrationSideCover = () => {

    return <SideCoverContainer>
        <div className="branding-top-bar">
            <Row className="w-100">
                <Col s={6} flexVC>
                    <img
                        draggable="false" alt="Amrita Vishwa Vidyapeetham"
                        src={require('../../assets/branding/amrita_vishwa_vidyapeetham_light_logo.png')}
                    />
                </Col>
                <Col s={6} flexVC flexHR className="text-right">
                    <img
                        draggable="false" alt="BIOCREST"
                        src={require('../../assets/branding/biocrest_logo_light.png')}
                    />
                </Col>
            </Row>
        </div>
        <div className="text-center">
            <h3 className="text-uppercase">WELCOME!</h3>
            {/*<p>*/}
            {/*    Lorem Ipsum is simply dummy text of the printing and typesetting industry.*/}
            {/*    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,*/}
            {/*    when an unknown printer took a galley of type and scrambled it to make a type*/}
            {/*    specimen book.*/}
            {/*</p>*/}
        </div>
    </SideCoverContainer>

};

export default RegistrationSideCover;
