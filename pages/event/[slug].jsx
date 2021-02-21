import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";

import Base from "../../src/components/shared/Base";
import APIFetch from "../../src/utils/APIFetch";
import {EVENT_DETAILS_QUERY} from "../../src/graphql/queries/event";
import Header from "../../src/components/shared/Header";
import MarkdownViewer from "../../src/components/shared/MarkdownViewer";
import FormButton from "../../src/components/ui/styled-components/Button";
import Footer from "../../src/components/shared/Footer";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import SubmissionGallery from "../../src/components/GalleryPage";

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

const TabButton = styled.div`
    padding: 1rem;
    font-size: 18px;
    margin: 5px;
    cursor: pointer;
    background: ${({ active }) => active ? '#a02541' : `none!important` };
    color: ${({ active }) => active ? 'white' : `#a02541` };
`;

const EventPage = ({ slug }) => {

    const [event, setEvent] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

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
        <CoverSection>
            <div className="container">
                <div className="row mx-0">
                    <div className="col-md-6 px-2">
                        {event?.coverURL &&
                        <img
                            src={event?.coverURL}
                            alt={event?.name}
                            className="shadow rounded"
                            draggable="false"
                        />}
                    </div>
                    <div className="col-md-6 px-2">
                        <h1 className="display-4 mb-1 font-weight-bold">{event?.name}</h1>
                        <div
                            style={{ color: '#AF0C3E' }}
                            className="bg-white d-inline-block shadow-sm px-3 py-2 mb-3 rounded"
                        >
                            {event?.isTeamEvent ? 'Team Competition' : 'Individual Competition'}
                        </div>
                        <div style={{ fontSize: '18px'}}>{event?.shortDescription}</div>
                        <div className="mt-3 text-dark bg-white d-inline-block p-3 rounded">
                            {(event?.acceptRegistrations && event?.isUserAllowedToRegister) ?
                                <div>
                                    <FormButton
                                        text="Register Now"
                                        link={`/register/${slug}`}
                                        py={3} px={4} fw
                                    />
                                    {event?.registrationCloseTimestamp &&
                                    <div style={{ fontSize: '17px' }} className="mt-3 text-danger text-center">
                                        Registrations close at {format(parseISO(event?.registrationCloseTimestamp), 'hh:MM a, dd-MM-yyyy')}
                                    </div>}
                                </div> :
                                event?.acceptRegistrations ?
                                    <div>
                                        This event is not open for you.
                                    </div> :
                                    <div>
                                        This event is not accepting registrations at the moment.
                                    </div>}
                        </div>
                    </div>
                </div>
            </div>
        </CoverSection>
        {event?.hasGallery &&
        <div className="p-2 d-flex align-items-center justify-content-center bg-white">
            <TabButton onClick={() => setShowGallery(false)} active={!showGallery}>
                About Event
            </TabButton>

            <TabButton onClick={() => setShowGallery(true)} active={showGallery}>
                View Submissions
            </TabButton>
        </div>}
        <div className="container px-2">
            {showGallery ?
            <div className="my-3">
                <SubmissionGallery id={event?.id} />
            </div> :
            <div className="bg-white p-3 my-3 shadow">
                <MarkdownViewer content={event?.details}/>
            </div>}
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