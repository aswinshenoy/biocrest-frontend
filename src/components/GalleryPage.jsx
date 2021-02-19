import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import APIFetch from "../utils/APIFetch";
import {EVENT_GALLERY_QUERY} from "../graphql/queries/event";
import Base from "./shared/Base";
import Header from "./shared/Header";


const GalleryCard = styled.div`
    padding: 0.75rem;
    background: white;
    color: black;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.15);
    img {
        max-width: 100%;
        border-radius: 5px;
        margin-bottom: 5px;
        box-shadow: 3px 5px 8px rgba(0,0,0,0.5);
    }
`;

const SubmissionGallery = ({ id }) => {

    const [items, setItems] = useState(null);
    const [event, setEvent] = useState(null);
    const [hasLoaded, setLoaded] = useState(false);

    const fetchItems = () => {
        APIFetch({
            query: EVENT_GALLERY_QUERY,
            variables: { eventID: id }
        }).then(({ data, errors, success }) => {
            if(success) {
                setEvent(data.event);
                setItems(data.gallery);
                setLoaded(true)
            }
        })
    };

    useEffect(fetchItems, []);

    const getFormats = (key) => {
        if(event?.formFields?.length){
            const fil = event.formFields.filter((f) => f.key === key);
            if(fil?.length > 0) {
                return fil[0]['formats']
            }
        }
    }

    return <Base meta={{ title: event?.name ? `${event.name} Gallery`  : 'Event Gallery' }}>
        <Header />
        {items?.length > 0 ?
            <div className="container-lg my-3">
                <h1>{event.name} Submissions</h1>
                <div>
                    <div className="row mx-0">
                        {items.map((e) => {
                            const format = getFormats(e.key);
                            return <div className="col-4 p-2">
                                <GalleryCard>
                                    {format === 'image/*' ?
                                        e.fileURL ? <img draggable="false" src={e.fileURL}/> : <img draggable="false"  src={e.url} />
                                        : <div>
                                            <a target="_blank" href={e.fileURL ? e.fileURL : e.url}>View Submission</a>
                                        </div>}
                                    <div className="line-height-1 p-2">
                                        <div>Submitted by</div>
                                        <div style={{ fontSize: '16px' }} className="text-primary font-weight-bold">
                                            {e.participant?.profile?.title} {e.participant?.profile?.name}
                                        </div>
                                    </div>
                                </GalleryCard>
                            </div>
                        })}
                    </div>

                </div>
            </div> :
            hasLoaded ?
                <div>
                    <h1>No submissions found</h1>
                </div> :
                <div>
                    <h1>Loading</h1>
                </div>
        }
    </Base>;

};

export default SubmissionGallery;