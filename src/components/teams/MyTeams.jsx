import React, { useEffect, useState } from 'react';

import APIFetch from "../../utils/APIFetch";
import {MY_TEAMS_QUERY} from "../../graphql/queries/team";

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

    const leaveTeam = (id) => {
        APIFetch({
            query: `mutation ($id: ID!){
              leaveTeam(id: $id){
                id
              }
            }`,
            variables: { id }
        }).then(({ success, data, errors }) => {
            if(success){
                fetchTeams()
            }
        })
    }

    return <div className="bg-white rounded shadow-sm">
        <div className="p-3 rounded-top" style={{ backgroundColor: '#AF0C3E' }}>
            <h3 className="mb-0" style={{ color: '#FFF', fontWeight: '600' }}>
                My Teams
            </h3>
        </div>
        {teams && teams.length > 0 ?
            <div>
                <div className="row p-2 font-weight-bold alert-danger border-bottom mx-0">
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
                    <div className="row p-2 border-bottom mx-0">
                        <div className="col-md-4 p-1">
                            {t.name}
                            <button onClick={() => leaveTeam(t.id)} className="ml-2 p-2 btn btn-danger">
                                Leave Team
                            </button>
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
        <div className="d-flex rounded-bottom align-items-center justify-content-end p-2" style={{ backgroundColor: '#AF0C3E' }}>
            <a href="/create-team" className="btn btn-light font-weight-bold m-1 px-4 py-2">Create A Team</a>
            <a href="/join-team" className="btn btn-light font-weight-bold m-1 px-4 py-2">Join A Team</a>
        </div>
    </div>;

};

export default MyTeams;