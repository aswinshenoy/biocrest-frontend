import React from 'react';

export default ({
    participant: { profile, team }, avgPoints
}) => {

    return <div className="card p-3 my-3">
        <div className="row mx-0">
            <div className="col-md-10 px-2">
                {profile ?
                    <React.Fragment>
                        <h2 className="my-2">
                            {profile?.title && `${profile?.title}.`} {profile.name}
                        </h2>
                        <div>{
                            profile?.type === 0 ? 'Admin' :
                                profile?.type === 1 ? 'Student' :
                                    profile?.type === 2 ? 'Academia' :
                                        profile?.type === 3 ? 'Industry' : 'Other'
                        }</div>
                    </React.Fragment> :
                    team ? <React.Fragment>
                        <h2 className="my-2">
                            {team.name}
                        </h2>
                        {team?.members?.length > 0 &&
                        <div className="row mx-0">
                            {team.members.map((m) =>
                                <div className="col-md-4 p-2">
                                    <a href={`/admin/profile/${m.id}`} className="p-2 card">
                                        <div>{m.title} {m.name}</div>
                                    </a>
                                </div>
                            )}
                        </div>}
                    </React.Fragment> : null}
            </div>
            <div className="col-md-2 d-flex align-items-center justify-content-end px-2">
                <h4>{avgPoints} Pts</h4>
            </div>
        </div>
    </div>;

};
