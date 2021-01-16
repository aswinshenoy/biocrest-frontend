import React from 'react';
import styled from "@emotion/styled";

import Base from "../shared/Base";
import Header from "../shared/Header";
import RegistrationStatus from "./status";
import {Col, Row} from "srx";

const CoverSection = styled.section`
    background: #a02541;
    color: white;
    min-height: 35vh;
    padding: 5vh 2.5vw;
    display: flex;
    align-items: flex-end;
    box-shadow: 1px 8px 8px rgba(0,0,0,0.25);
`;

const DashboardPage = () => {

    return <Base meta={{ title: 'Dashboard' }}>
        <Header />
        <CoverSection>
            <h1>Dashboard</h1>
        </CoverSection>
        <div className="container-lg px-2 py-5">
            <Row>
                <Col md={6} p={2}>
                    <RegistrationStatus />
                </Col>
                <Col md={6} p={1}>
                    <div className="alert alert-warning shadow p-3">
                        <h3 className="font-weight-bold">Competition Registrations Not Open</h3>
                        <p>
                            Individual competition registrations are not open at the moment, please
                            check back this space later. We shall also intimate you by email
                            when this process starts.
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    </Base>;

};

export default DashboardPage;