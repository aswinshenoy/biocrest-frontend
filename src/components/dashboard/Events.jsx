import React, { useState, useEffect } from 'react';
import APIFetch from "../../utils/APIFetch";
import {EVENTS_QUERY} from "../../graphql/queries/event";
import {Card, Col, Row} from "srx";

const eventID = process.env.eventID || 1;


const EventsListing = () => {

    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        APIFetch({
            query: EVENTS_QUERY,
            variables: {
                parentID: eventID
            }
        }).then(({ data, errors, success}) => {
            if(success){
                setEvents(data.events.events);
            }
        })
    };

    useEffect(fetchEvents, [])

    return <div className="my-3">
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="font-weight-bold">Competitions</h2>
        {events?.length > 0 ?
        <Row>
            {events.map((e) =>
                <Col md={4} p={2}>
                    <a href={`/event/${e.slug}`} className="plain-link">
                        <Card bg="white" p={4} shadow={2} round={0}>
                            <h3 style={{ color: '#AF0C3E', fontWeight: '600' }}>{e.name}</h3>
                            <div>{e.shortDescription}</div>
                        </Card>
                    </a>
                </Col>
            )}
        </Row> : null}
    </div>

};

export default EventsListing;