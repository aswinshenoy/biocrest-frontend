import React, { useState, useEffect } from 'react';
import shortid from "shortid";
import Fade from "react-reveal/Fade";

import APIFetch from "../../../utils/APIFetch";
import {EVENTS_QUERY} from "../../../graphql/queries/event";

import WebinarCard from "./WebinarCard";

const eventID = process.env.eventID || 1;

const WebinarListing = ({ showAll = false }) => {

    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        APIFetch({
            query: EVENTS_QUERY,
            variables: {
                parentID: eventID,
                eventType: 3
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
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="font-weight-bold">Schedule</h2>
        {events?.filter((e) => !(!e.isUserAllowedToRegister) || showAll ).length > 0 ?
            <div>{events.filter((e) => !(!e.isUserAllowedToRegister) || showAll).map((e, i) =>
                <Fade delay={i*200} key={shortid.generate()}>
                    <WebinarCard {...e} />
                </Fade>
            )}</div> : <div>
                <h3>No Webinars listed now</h3>
            </div>}
    </div>;

};

export default WebinarListing;