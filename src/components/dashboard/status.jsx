import React from 'react';
import {useQuery} from "graphql-hooks";
import {MY_EVENT_PROFILE_QUERY} from "../../graphql/queries/event";
import MyIDCard from "./IDCard";

const eventID = process.env.eventID || 1;

const RegistrationStatus = () => {

    const { loading, data } = useQuery(MY_EVENT_PROFILE_QUERY, { variables: { eventID }});

    return loading ? <div>Loading</div> :
    data?.myEventProfile?.isApproved ?
    <div className="alert-success p-3">
        <h3 className="text-success">Registration Complete</h3>
        <p>Your profile has been successfully verified, and your registration is complete.</p>
        <div className="p-2">
            <MyIDCard {...data.myEventProfile} />
        </div>
    </div> :
    data?.myEventProfile?.remarks ?
        <div className="alert-warning p-3">
            <h3>Corrections Requested</h3>
            <p>
                We could not verify your profile for confirming your registration, and we expect
                you to make some corrections so that we can complete your registration.
            </p>
            <div className="py-2">
                <div className="font-weight-bold mb-1">Remarks</div>
                {data?.myEventProfile?.remarks}
            </div>
        </div> :
    <div className="alert-info p-3">
        <h3>Pending Verification</h3>
        <p>
            Our team will soon manually review your registration data for verification, and confirm
            your registration. Once that is done, you will receive an email, meanwhile you could
            also keep tracking your status in this dashboard. Typically this process may take 48 hours.
        </p>
    </div>
};

export default RegistrationStatus;