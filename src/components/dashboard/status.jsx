import React from 'react';
import {useQuery} from "graphql-hooks";
import {MY_REGISTRATION_QUERY} from "../../graphql/queries/user";

const RegistrationStatus = () => {

    const { loading, data } = useQuery(MY_REGISTRATION_QUERY);

    return loading ? <div>Loading</div> :
    data?.me?.isIDVerified ?
    <div className="alert-success p-3">
        <h3 className="text-success">Registration Complete</h3>
        <p>Your profile has been successfully verified, and your registration is complete.</p>
    </div> :
    data?.me?.requiresCorrection ?
        <div className="alert-warning p-3">
            <h3>Corrections Requested</h3>
            <p>
                We could not verify your profile for confirming your registration, and we expect
                you to make some corrections so that we can complete your registration.
            </p>
            <div className="py-2">
                <div className="font-weight-bold mb-1">Remarks</div>
                {data?.me?.remarks}
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