import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";

import Base from "../../src/components/shared/Base";
import APIFetch from "../../src/utils/APIFetch";
import {EVENT_DETAILS_QUERY} from "../../src/graphql/queries/event";
import Header from "../../src/components/shared/Header";
import MarkdownViewer from "../../src/components/shared/MarkdownViewer";
import FormButton from "../../src/components/ui/styled-components/Button";
import Footer from "../../src/components/shared/Footer";

const eventID = process.env.eventID || 1;

const CoverSection = styled.section`
    background: #a02541;
    color: white;
    min-height: 35vh;
    padding: 5vh 2.5vw;
    display: flex;
    align-items: flex-end;
    box-shadow: 1px 8px 8px rgba(0,0,0,0.25);
`;

const EventPage = ({ slug }) => {

    const [event, setEvent] = useState(null);

    const fetchEvent = () => {
        APIFetch({
            query: EVENT_DETAILS_QUERY,
            variables: {
                slug,
                parentID: eventID
            }
        }).then(({ data, success, errors }) => {
            if(success) {
                setEvent(data.event);
            }
        })
    }

    useEffect(fetchEvent, []);

    return event ?
    <Base meta={{ title: event?.name ? `${event.name} - Event Page` : 'Event Page' }}>
        <Header />
        <div style={{ minHeight: '85vh' }} className="row mx-0">
            <div className="col-md-4 px-0">
                <CoverSection>
                    <div>
                        <h1 className="display-4 mb-1 font-weight-bold">{event?.name}</h1>
                        <div
                            style={{ color: '#AF0C3E' }}
                            className="bg-white d-inline-block shadow-sm px-2 py-1 mb-3 rounded"
                        >
                            {event?.isTeamEvent ? 'Team Competition' : 'Individual Competition'}
                        </div>
                        <div style={{ fontSize: '18px'}}>{event?.shortDescription}</div>
                    </div>
                </CoverSection>
                <div className="card w-100 p-3 my-2 shadow">
                    <FormButton
                        text="Register Now"
                        link={`/register/${slug}`}
                        py={3} px={4} fw
                    />
                </div>
            </div>
            <div className="col-md-8 px-4">
                <div>
                    <div className="bg-white shadow card my-2 p-3">
                        <h2  style={{ color: '#AF0C3E', fontWeight: '600' }} className="mt-3 mb-2">Event Details</h2>
                        <MarkdownViewer
                            content={event?.details}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </Base> : <Base meta={{ title: 'Loading Event Details' }}>
        <Header />
        <h1>Loading</h1>
    </Base>

};

EventPage.getInitialProps = async ({ query }) => {
    return { slug: query.slug };
};

export default EventPage;