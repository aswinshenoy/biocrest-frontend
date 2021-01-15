import React from 'react';
import styled from "@emotion/styled";
import QRCode from "react-qr-code";

const IDCardWrap = styled.div`
    background: white;
    color: black;
    width: 550px;
    max-width: 100%;
    user-select: none;
    h2 {
      line-height: 1;
      color: #AF0C3E;
      margin-bottom: 5px;
    }
    h3 {
        line-height: 1;
    }
`

const MyIDCard = ({
    uuid, id, profile,
}) => {

    return <IDCardWrap>
        <div style={{ background: '#AF0C3E' }} className="row w-100 mx-0">
            <div className="col-3 p-3">
                <img alt="biocrest" src={require('../../assets/branding/biocrest_logo_light.png')} />
            </div>
            <div className="col-9 text-right small d-flex justify-content-end align-items-center text-light p-3">
                <h3>{profile.type === 1 ? 'Student' : profile.type === 2 ? 'Academia' : 'Industry'}</h3>
            </div>
        </div>
        <div className="row w-100 p-3 mx-0">
            <div className="col-9 px-1">
                <h2>{profile.title} {profile.name}</h2>
                <div className="mb-1">{profile.email}</div>
                <div>{profile.gender} | {profile.city}, {profile.state}, {profile.country}</div>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-center px-1">
                <QRCode value={uuid} size={64} />,
            </div>
        </div>
    </IDCardWrap>
};

export default MyIDCard;