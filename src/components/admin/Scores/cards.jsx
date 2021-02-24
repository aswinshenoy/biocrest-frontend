import React from 'react';

export default ({
    participant: { profile, team },
    rank, avgPoints, noOfJudges, highScore, lowScore, stdDiv, variance
}) => {

    return <div className="card p-3 my-3">
        <div className="row mx-0">
            <div className="col-md-10 px-2">
                {profile ?
                    <React.Fragment>
                        <h2 className="my-2">
                            #{rank}. {profile?.title && `${profile?.title}.`} {profile.name}
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
                <div>
                    <h4>Avg: {avgPoints} Pts</h4>
                    <h5>Votes: {noOfJudges}</h5>
                </div>

            </div>
        </div>
        <div className="d-flex align-items-center p-2">
            <div className="mr-2">High: {highScore} Pts</div>
            <div className="mr-2">Low: {lowScore} Pts</div>
            <div className="mr-2">Avg: {avgPoints} Pts</div>
            <div className="mr-2">Variance: {variance}</div>
            <div className="mr-2">Standard Deviation: {stdDiv}</div>
        </div>
    </div>;

};
