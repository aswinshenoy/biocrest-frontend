import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";

import Base from "../shared/Base";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

import EventListing from "./Listing";
import MobileView from "./MobileView";
import MyProfile from "./MyProfile";
import NextEvents from "./NextEvents";
import LiveEvents from "./LiveEvents";
import UpcomingEvents from "./UpcomingEvents";

const CoverSection = styled.section`
    background: #a02541;
    color: white;
    min-height: 15vh;
    padding: 5vh 2.5vw;
    display: flex;
    align-items: flex-end;
    box-shadow: 1px 8px 8px rgba(0,0,0,0.25);
`;

const DashboardPage = () => {

    return <Base meta={{ title: 'Dashboard' }}>
        <Header />
        <div className="d-none d-md-block">
            <CoverSection>
                <h1>Dashboard</h1>
            </CoverSection>
            <div style={{ minHeight: '100vh' }} className="px-2 py-5">
                <UpcomingEvents />
                <Row>
                    <Col md={4} p={2}>
                      <MyProfile />
                    </Col>
                    <Col md={8} p={2}>
                        <EventListing />
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
        <div className="d-block d-md-none">
            <MobileView />
        </div>

    </Base>;

};

export default DashboardPage;