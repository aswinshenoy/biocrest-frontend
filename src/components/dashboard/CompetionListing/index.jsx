import React, { useState, useEffect } from 'react';
import {Col, Row} from "srx";
import shortid from "shortid";
import Fade from "react-reveal/Fade";

import APIFetch from "../../../utils/APIFetch";
import {EVENTS_QUERY} from "../../../graphql/queries/event";

import CompetitionCard from "./CompetitionCard";

const eventID = process.env.eventID || 1;

const CompetitionsListing = ({ showAll = false }) => {

    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        APIFetch({
            query: EVENTS_QUERY,
            variables: {
                parentID: eventID,
                eventType: 1
            }
        }).then(({ data, errors, success}) => {
            if(success){
                setEvents(data.events.events);
            }
        })
    };

    useEffect(fetchEvents, [])

    return events?.length > 0 &&
    <div className="my-3">
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="font-weight-bold">Competitions</h2>
        {events?.filter((e) => !(!e.isUserAllowedToRegister) || showAll ).length > 0 ?
            <Row>{events.filter((e) => !(!e.isUserAllowedToRegister) || showAll).map((e, i) =>
                <Col s={6} md={4} p={1} key={shortid.generate()} className="h-100">
                    <Fade delay={i*200}>
                        <CompetitionCard {...e} />
                    </Fade>
                </Col>
            )}</Row> : <div>
                <h3>No competitions listed now</h3>
            </div>}
    </div>;

};

export default CompetitionsListing;