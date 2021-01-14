import React, {useEffect, useState} from 'react';
import {useQuery} from "graphql-hooks";

import {PROFILES_QUERY} from "../../../graphql/queries/user"
import {EVENT_QUERY} from "../../../graphql/queries/event";

import SearchBar from './searchBar';
import Table from './table';
import APIFetch from "../../../utils/APIFetch";
import ExportBar from "./export";

const eventID = process.env.eventID || 1;

const AccountsViewer = () => {

    const { loading: loadingEvent, error: eventError , data: event, refetch: refetchEvent } = useQuery(
        EVENT_QUERY, { variables: { eventID,} }
    );

    const [profiles, setProfiles] = useState([]);
    const [after, setAfter] = useState(null);
    const [hasNext, setHasNext] = useState(true);
    const [hasLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const fetch = () => {
        if(hasNext){
            APIFetch({
                query: PROFILES_QUERY,
                variables: {
                    eventID,
                    after
                }
            }).then(({ success, data, errors }) => {
                setLoaded(true);
                if(success) {
                    if(data?.participants?.participants?.length > 0 && profiles.length > 0){
                        setProfiles([...profiles, ...data?.participants?.participants]);
                    } else if(data?.participants?.participants?.length > 0){
                        setProfiles([...data?.participants?.participants])
                    }
                    setAfter(data.participants.lastCursor);
                    setHasNext(data.participants.hasNext);
                } else {
                    setError(errors);
                }
            })
        }
    };

    const filterFetch = ({ keyword, type, endDate, startDate }) => {
        APIFetch({
            query: PROFILES_QUERY,
            variables: {
                eventID,
                keyword,
                filters: {
                    type,
                    endDate,
                    startDate
                }
            }
        }).then(({ success, data, errors }) => {
            setLoaded(true);
            if(success) {
                setProfiles([...data?.participants?.participants])
                setAfter(data.participants.lastCursor);
                setHasNext(data.participants.hasNext);
            } else {
                setError(errors);
            }
        })
    }

    useEffect(fetch, []);

    return error ? <div>Error occurred while loading. Please refresh to retry</div> :
        !hasLoaded ? <div>Loading</div> :
        <div>
            <div>
                <h2 className="mb-2">Registrations</h2>
                <div className="mb-4">
                    View all registered users
                </div>
            </div>
            <div className="my-2">
                <SearchBar isLoading={hasLoaded} refetch={filterFetch} />
                {profiles.length > 0 && <ExportBar profiles={profiles} fields={event?.event?.formFields} />}
            </div>
            <Table
                fields={event?.event?.formFields}
                profiles={profiles}
                loadMore={fetch}
            />
        </div>;
};

export default AccountsViewer;