import React, {useEffect, useState} from 'react';
import {PROFILES_QUERY} from "../../graphql/queries/user";
import VerifyCard from "./VerifyCard";
import APIFetch from "../../utils/APIFetch";
import {Waypoint} from "react-waypoint";

const eventID = process.env.eventID || 1;


const AccountVerifier = () => {

    const [profiles, setProfiles] = useState([]);
    const [after, setAfter] = useState(null);
    const [hasNext, setHasNext] = useState(true);

    const fetch = () => {
        if(hasNext){
            APIFetch({
                query: PROFILES_QUERY,
                variables: {
                    eventID,
                    after,
                    filters: {
                        verificationRequired: true
                    }
                }
            }).then(({ success, data, errors }) => {
                if(success) {
                    if(data?.participants?.participants?.length > 0 && profiles.length > 0){
                        setProfiles([...profiles, ...data?.participants?.participants]);
                    } else if(data?.participants?.participants?.length > 0){
                        setProfiles([...data?.participants?.participants])
                    }
                    setAfter(data.participants.lastCursor);
                    setHasNext(data.participants.hasNext);
                }
            })
        }
    };

    useEffect(fetch, [])

    return<div>
        {profiles?.length > 0 ?
            <div>
                <h1 className="mb-4">Pending Verifications</h1>
                {profiles.map((p) =>
                    <div className="my-2">
                        <VerifyCard {...p} />
                    </div>
                )}
                {hasNext && <Waypoint onEnter={() => fetch()}>
                    <div className="my-3 p-2">
                        <button onClick={() => fetch()} className="btn btn-primary p-3">Load More</button>
                    </div>
                </Waypoint>}
            </div>
            : <div>No profiles to verify</div>}
    </div>

};

export default AccountVerifier;