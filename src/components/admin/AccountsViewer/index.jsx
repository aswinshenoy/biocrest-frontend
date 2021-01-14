import React, {useEffect, useState} from 'react';
import {useQuery} from "graphql-hooks";

import {PROFILES_QUERY} from "../../../graphql/queries/user"
import {EVENT_QUERY} from "../../../graphql/queries/event";

import SearchBar from './searchBar';
import Table from './table';
import APIFetch from "../../../utils/APIFetch";
import ExportBar from "./export";
import {TextInput} from "srx";
import DatePicker from "react-datepicker";

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

    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);

    const fetch = (forced = false) => {
        if(hasNext || forced){
            APIFetch({
                query: PROFILES_QUERY,
                variables: {
                    eventID,
                    after: !forced ? after : null,
                    search: keyword,
                    filters: {
                        type: type > 0 ? type : null,
                        endDate,
                        startDate
                    }
                }
            }).then(({ success, data, errors }) => {
                setLoaded(true);
                if(success) {
                    if(!forced && data?.participants?.participants?.length > 0 && profiles.length > 0){
                        setProfiles([...profiles, ...data?.participants?.participants]);
                    } else if(data?.participants?.participants?.length > 0){
                        setProfiles([...data?.participants?.participants])
                    } else {
                        setProfiles([]);
                    }
                    setAfter(data.participants.lastCursor);
                    setHasNext(data.participants.hasNext);
                } else {
                    setError(errors);
                }
            })
        }
    };

    useEffect(fetch, []);


    useEffect(() => {
        fetch(true);
    }, [type, endDate, startDate])

    const SearchBoxTable = () =>
    <div className="my-2">
        <div className="bg-white p-2">
            <div className="row w-100 mx-0">
                <div className="col-md-4 p-1">
                    <form className="d-flex align-items-center" onSubmit={(e) => { e.preventDefault(); fetch(true);} }>
                        <TextInput
                            className="w-100"
                            label="Search" name="search"
                            placeholder="Search by name, phone or email"
                            value={keyword} onChange={setKeyword}
                        />
                        <button className="btn btn-primary p-2" type="submit">Search</button>
                    </form>
                </div>
                <div className="col-md-4 d-flex align-items-center p-1">
                    <select
                        value={type}
                        onChange={(e) => setType(e.currentTarget.value)}
                        className="w-100 px-3 py-2"
                    >
                        <option value={0}>All</option>
                        <option value={1}>Student</option>
                        <option value={2}>Academician</option>
                        <option value={3}>Industry</option>
                    </select>
                </div>
                <div className="col-md-4 d-flex align-items-center p-1">
                    <div className="p-1">
                        <label className="mb-0">From</label>
                        <DatePicker selected={startDate} onChange={setStartDate} />
                    </div>
                    <div className="p-1">
                        <label className="mb-0">To</label>
                        <DatePicker selected={endDate} onChange={setEndDate} />
                    </div>
                </div>
            </div>
        </div>
    </div>;

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
                {SearchBoxTable()}
                {profiles.length > 0 && <ExportBar profiles={profiles} fields={event?.event?.formFields} />}
            </div>
            <Table
                fields={event?.event?.formFields}
                profiles={profiles}
                loadMore={() => fetch()}
            />
        </div>;
};

export default AccountsViewer;