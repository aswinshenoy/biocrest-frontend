import React, { useState, useEffect } from 'react';
import APIFetch from "../../../utils/APIFetch";
import {MY_EVENT_REGS} from "../../../graphql/queries/event";

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
    <div className="bg-white rounded shadow-sm">
        <div className="rounded-top p-3" style={{ backgroundColor: '#AF0C3E' }}>
            <h3 className="mb-0" style={{ color: '#FFF', fontWeight: '600' }}>My Competition Registrations</h3>
        </div>
        {events?.length > 0 ?
        <div>
            <div className="row mx-0 p-2 alert-danger font-weight-bold py-2">
                <div className="col-md-6 p-1">
                        Event Name
                </div>
                <div className="col-md-3 p-1">Status</div>
                <div className="col-md-3 d-flex justify-content-end p-1">

                </div>
            </div>
            {events.map((e) =>
            <div className="row mx-0 border-top p-2">
                <div className="col-md-6 p-1">
                    <div className="font-weight-bold mb-0">
                        {e.event.name}
                    </div>
                </div>
                <div className="col-md-3 p-1">{
                    e.isApproved ? <div className="text-success">Approved</div>
                        : <div className="text-danger">Pending</div>
                }</div>
                <div className="col-md-3 d-flex justify-content-end p-1">
                    {e.isApproved && e.event.postApprovalFields?.length>0 ?
                    <a href={`/register/${e.event.slug}`} className="font-weight-bold btn btn-danger rounded-0 text-light py-2">
                        Submit Work
                    </a> :
                    <a href={`/register/${e.event.slug}`} className="text-primary">
                        Edit
                    </a>}
                </div>
            </div>
        )}</div> :
            <div className="p-2 d-flex align-items-center justify-content-center text-center" style={{ minHeight: '18vh' }}>
                <div>
                    <h3>No Registrations</h3>
                    <div className="font-weight-bold mb-3">You have not registered for any event (yet)</div>
                </div>
            </div>}
    </div> : <div />;


};

export default MyEventRegistrations;