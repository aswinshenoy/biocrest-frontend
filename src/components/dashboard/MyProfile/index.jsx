import React from 'react';
import RegistrationStatus from "./status";
import MyEventRegistrations from "./MyEvents";
import MyTeams from "../../teams/MyTeams";

const MyProfile = () => {

    return <div className="p-1">
        {process.env.features?.profile?.registrationStatus &&
        <div className="mb-3">
            <RegistrationStatus />
        </div>}
        {process.env.features?.profile?.myRegistrations &&
        <div className="mb-3">
            <MyEventRegistrations />
        </div>}
        {process.env.features?.team &&
        <div className="mb-3">
            <MyTeams />
        </div>}
    </div>

};

export default MyProfile;