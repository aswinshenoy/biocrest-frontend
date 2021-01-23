import React, { useEffect, useState } from 'react';

import APIFetch from "../../../utils/APIFetch";
import {MY_TEAMS_QUERY} from "../../../graphql/queries/team";

const MyTeams = () => {

    const [teams, setTeams] = useState(null);

    const fetchTeams = () => {
        APIFetch({
            query: MY_TEAMS_QUERY,
        }).then(({ success, data, errors }) => {
            if (success) {
                setTeams(data.myTeams);
            }
        })
    };

    useEffect(fetchTeams, []);

    return <div className="bg-white p-3 shadow-sm card my-3">
        <h3 className="mb-3" style={{ color: '#AF0C3E', fontWeight: '600' }}>My Teams</h3>
        {teams && teams.length > 0 ?
        <div>
            <div className="row font-weight-bold py-2 border-bottom mx-0">
                <div className="col-md-4 p-1">
                    Team Name
                </div>
                <div className="col-md-3 p-1">
                    Invite Code
                </div>
                <div className="col-md-4 p-1">
                    Members
                </div>
            </div>
            {teams.map((t) =>
                <div className="row py-2 border-bottom mx-0">
                    <div className="col-md-4 p-1">
                        {t.name}
                    </div>
                    <div className="col-md-3 p-1">
                        {t.inviteCode}
                    </div>
                    <div className="col-md-4 p-1">
                        {t.members?.length > 0 &&
                         t.members.map((t) =>
                            <span>{t.name}, </span>
                         )}
                    </div>
                </div>
            )}
        </div> :
        <div>
            <h6 className="font-weight-bold mb-3">You're not part of any teams (yet)</h6>
        </div>}
        <div className="d-flex align-items-center justify-content-end my-2">
            <a href="/create-team" className="btn btn-danger font-weight-bold text-light m-1 px-4 py-2">Create A Team</a>
            <a href="/join-team" className="btn btn-danger font-weight-bold text-light m-1 px-4 py-2">Join A Team</a>
        </div>
    </div>;

};

export default MyTeams;