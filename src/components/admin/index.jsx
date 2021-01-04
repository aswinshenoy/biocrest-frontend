import React from 'react';
import styled from "@emotion/styled";

import Header from "../shared/Header";

const MenuButton = styled.a`
    background: white;
    padding: 1rem;
    min-height: 20vh;
    width: 100%;
    border: none!important;
    font-weight: 600;
    font-size: 16px;
    display: block;
    text-decoration: none!important;
    text-align: center;
    img {
      margin-bottom: 12px;
    }
`;


const AdminPanel = () => {

    return <div className="row mx-0">
        <div className="col-md-4 px-2">
            <MenuButton href="/admin/verify">
                <img alt="ID Verification" src={require('../../assets/icons/check.png')} />
                <div>Verify Registrations</div>
            </MenuButton>
        </div>
        <div className="col-md-4 px-2">
            <MenuButton href="/admin/view">
                <img alt="Search User" src={require('../../assets/icons/search-user.png')} />
                <div>View & Search Participants</div>
            </MenuButton>
        </div>
    </div>
};

export default AdminPanel