import React, { useState, useEffect } from 'react';
import Header from "./shared/Header";
import Base from "./shared/Base";
import APIFetch from "../utils/APIFetch";


const ParticipationCertificate = ({ id }) => {

    const [certificate, setCertificate] = useState(null);

    const fetchCertificate = () => {
        APIFetch({
            query: `mutation ($eventID: ID!){
              generateParticipationCertificate(eventID: $eventID){
                file
              }
            }`,
            variables: { eventID: id }
        }).then(({ success, data, errors }) => {
            if(success) {
                setCertificate(data?.generateParticipationCertificate?.file)
            }
        })
    };

    useEffect(fetchCertificate, [])

    return <Base meta={{ title: 'Participation Certificate' }}>
        <Header />
        <div>
            {certificate &&
            <iframe
                style={{ minHeight: '90vh' }}
                src={certificate} width="100%"
            />}
        </div>
    </Base>


};

export default ParticipationCertificate;