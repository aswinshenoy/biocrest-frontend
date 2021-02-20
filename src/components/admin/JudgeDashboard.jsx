import React, { useState, useEffect } from 'react';
import {Card, Col, Row} from "srx";

import APIFetch from "../../utils/APIFetch";

const JudgeDashboard = () => {

    const [events, setEvents] = useState();

    const fetchEvents = () => {
        APIFetch({
            query: `{
              eventsToJudge{
                id
                name
                shortDescription
                slug
              }
            }`
        }).then(({ success, data, errors}) => {
            if(success && data?.eventsToJudge) {
                setEvents(data.eventsToJudge)
            }
        })
    }

    useEffect(fetchEvents, []);

    return <div>
        <div className="my-5">
            <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="font-weight-bold mb-2">Judge Dashboard</h2>
            {events?.length > 0 ?
            <Row>{events.map((e) =>
                <Col md={4} p={2}>
                    <a href={`/admin/judge/${e.id}`} className="plain-link">
                        <Card bg="white" p={4} shadow={2} round={3}>
                            <h3 className="mb-0" style={{ color: '#AF0C3E', fontWeight: '600' }}>{e.name}</h3>
                            <div>{e.shortDescription}</div>
                        </Card>
                    </a>
                </Col>
            )}</Row> :
            <div>
                <h3>No Events Found</h3>
            </div>}
        </div>
    </div>

};

export default JudgeDashboard;