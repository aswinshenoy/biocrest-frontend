import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";

import Base from "../shared/Base";
import Header from "../shared/Header";
import RegistrationStatus from "./status";
import EventsListing from "./Events";
import MyEventRegistrations from "./MyEvents";
import MyTeams from "../teams/MyTeams";
import Footer from "../shared/Footer";

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
        <div style={{ minHeight: '100vh' }} className="px-2 py-5">
            <Row>
                <Col md={4} p={2}>
                    <RegistrationStatus />
                    <div className="my-3">
                        <MyEventRegistrations />
                    </div>
                    <MyTeams />
                </Col>
                <Col md={8} p={2}>
                    <EventsListing />
                </Col>
            </Row>
        </div>
        <Footer />
    </Base>;

};

export default DashboardPage;