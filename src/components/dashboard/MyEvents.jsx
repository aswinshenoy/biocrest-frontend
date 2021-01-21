import React, { useState, useEffect } from 'react';
import APIFetch from "../../utils/APIFetch";
import {MY_EVENT_REGS} from "../../graphql/queries/event";

const eventID = process.env.eventID || 1;

const MyEventRegistrations = () => {

    const [events, setEvents] = useState(null);
    const [isLoaded, setLoaded] = useState(false);


    const fetchEvents = () => {
        APIFetch({
            query: MY_EVENT_REGS,
            variables: {
                eventID
            }
        }).then(({ data, success, errors }) => {
            if(success){
                setEvents(data.myEvents);
                setLoaded(true)
            }
        })
    };

    useEffect(fetchEvents, []);

    return isLoaded ?
    <div className="bg-white rounded p-3 my-1 shadow-sm">
        <h3 style={{ color: '#AF0C3E', fontWeight: '600' }}>My Competition Registrations</h3>
        {events?.length > 0 ?
        <div>{events.map((e) =>
            <div className="row mx-0 border-bottom py-2">
                <div className="col-md-8 p-1">
                    <div className="font-weight-bold mb-0">
                        {e.event.name}
                    </div>
                </div>
                <div className="col-md-4 p-1">{
                    e.isApproved ? <div className="text-success">Approved</div>
                        : <div className="text-danger">Pending</div>
                }</div>
            </div>
        )}</div> :
        <div>
            You have not registered for any competitions.
        </div>}
    </div> : <div />;


};

export default MyEventRegistrations;