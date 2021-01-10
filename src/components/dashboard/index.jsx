import React from 'react';
import styled from "@emotion/styled";

import Base from "../shared/Base";
import Header from "../shared/Header";
import RegistrationStatus from "./status";

const CoverSection = styled.section`
    background: #340853;
    color: white;
    min-height: 35vh;
    padding: 5vh 2.5vw;
    display: flex;
    align-items: flex-end;
    box-shadow: 2px 3px 8px rgba(0,0,0,0.35);
`;

const DashboardPage = () => {

    return <Base meta={{ title: 'Dashboard' }}>
        <Header />
        <CoverSection>
            <h1>Dashboard</h1>
        </CoverSection>
        <div className="container-lg px-2 py-5">
            <RegistrationStatus />
        </div>
    </Base>;

};

export default DashboardPage;