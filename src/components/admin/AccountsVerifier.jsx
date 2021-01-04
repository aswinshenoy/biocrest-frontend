import React, {useEffect, useState} from 'react';
import {useQuery} from "graphql-hooks";
import {PROFILES_TO_VERIFY_QUERY} from "../../graphql/queries/user";
import VerifyCard from "./VerifyCard";

const AccountVerifier = () => {

    const { loading, error, data }  = useQuery(PROFILES_TO_VERIFY_QUERY);

    return loading ? <div>Loading</div> :
    <div>
        {data.profilesToVerify?.length > 0 ?
            <div>
                <h1 className="mb-4">Pending Verifications</h1>
                {data.profilesToVerify.map((p) =>
                    <div className="my-2">
                        <VerifyCard {...p} />
                    </div>
                )}
            </div>
            : <div>No profiles to verify</div>}
    </div>

};

export default AccountVerifier;