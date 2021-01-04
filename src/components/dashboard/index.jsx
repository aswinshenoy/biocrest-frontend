import React from 'react';
import styled from "@emotion/styled";

import Base from "../shared/Base";
import Header from "../shared/Header";
import RegistrationStatus from "./status";

const CoverSection = styled.section`
    background: #AF0C3E;
    color: white;
    min-height: 35vh;
    padding: 5vh 2.5vw;
    display: flex;
    align-items: flex-end;
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