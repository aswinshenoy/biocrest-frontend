import React, { useEffect, useState } from "react";
import Base from "../../src/components/shared/Base";
import Header from "../../src/components/shared/Header";

import APIFetch from "../../src/utils/APIFetch";
import {EVENT_REG_FORM_QUERY, MY_BASIC_EVENT_PROFILE_QUERY} from "../../src/graphql/queries/event";
import EventRegister from "../../src/components/register";
import FormButton from "../../src/components/ui/styled-components/Button";

const eventID = process.env.eventID || 1;

const EventRegistrationPage = ({ slug }) => {

    const [event, setEvent] = useState(null);
    const [myProfile, setProfile] = useState(null);
    const [isRegistered, setRegistered] = useState(false);
    const [isEditor, showEditor] = useState(false);

    const fetchForm = () => {
        APIFetch({
            query: EVENT_REG_FORM_QUERY,
            variables: {
                slug,
                parentID: eventID
            }
        }).then(({ success, data, errors }) => {
            if(success) {
                APIFetch({
                    query: MY_BASIC_EVENT_PROFILE_QUERY,
                    variables: {
                        eventID: data?.event.id
                    }
                }).then(({ success, data: profile, errors }) => {
                    setEvent(data.event);
                    if(success) {
                        setProfile(profile.myEventProfile);
                        setRegistered(true);
                    }
                })

            }
        })
    };

    useEffect(fetchForm, []);

    return <Base meta={{ title: 'Competition Registration' }}>
        <Header />
        {isEditor ?
        <EventRegister
            isEditor
            myProfile={myProfile}
            event={event}
            onRegister={(p) => { fetchForm(); showEditor(false); setProfile(p); setRegistered(true) }}
        /> :
        isRegistered ?
        <div className="container p-2 my-3 d-flex align-items-center justify-content-center">
            <div className="bg-white p-3 shadow-sm" style={{ width: '720px', maxWidth: '100%' }}>
                <h1 style={{ color: '#AF0C3E', fontWeight: '600' }}>
                    {!myProfile?.isApproved ? 'Pending Approval' : 'Registration Successful'}
                </h1>
                {!myProfile?.isApproved  ?
                <p>
                    We will inform you by email and through your dashboard once
                    your registration / submission is approved.
                </p> :
                <p>
                    You have successfully registered for the event
                </p>}
                {!myProfile?.isApproved &&
                <div>
                    <FormButton
                        text="Edit Registration"
                        onClick={() => showEditor(true)}
                        px={4} py={3}
                    />
                </div>}
            </div>
        </div> :
        event ?
        <EventRegister
            event={event}
            onRegister={(p) => { setProfile(p); setRegistered(true) }}
        /> :
        <div>Loading</div>}
    </Base>;

};

EventRegistrationPage.getInitialProps = async ({ query }) => {
    return { slug: query.slug };
};

export default EventRegistrationPage;