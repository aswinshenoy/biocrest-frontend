import React from 'react';
import RegistrationStatus from "./status";
import MyEventRegistrations from "./MyEvents";
import MyTeams from "../../teams/MyTeams";

const MyProfile = () => {

    return <div className="p-1">
        <div className="mb-3">
            <RegistrationStatus />
        </div>
        <div className="mb-3">
            <MyEventRegistrations />
        </div>
        <div className="mb-3">
            <MyTeams />
        </div>
    </div>

};

export default MyProfile;