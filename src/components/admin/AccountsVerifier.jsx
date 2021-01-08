import React, {useEffect, useState} from 'react';
import {useQuery} from "graphql-hooks";
import {PROFILES_QUERY} from "../../graphql/queries/user";
import VerifyCard from "./VerifyCard";

const eventID = process.env.eventID || 1;


const AccountVerifier = () => {

    const { loading, error, data, refetch } = useQuery(
        PROFILES_QUERY, {
            variables: {
                eventID,
                filters: {
                    verificationRequired: true
                }
            }
        });

    return loading ? <div>Loading</div> :
    <div>
        {data?.participants?.participants?.length > 0 ?
            <div>
                <h1 className="mb-4">Pending Verifications</h1>
                {data.participants.participants.map((p) =>
                    <div className="my-2">
                        <VerifyCard {...p} />
                    </div>
                )}
            </div>
            : <div>No profiles to verify</div>}
    </div>

};

export default AccountVerifier;