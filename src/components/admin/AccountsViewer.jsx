import React from 'react';
import {useQuery} from "graphql-hooks";
import {PROFILES_QUERY} from "../../graphql/queries/user";

const AccountsViewer = () => {

    const { loading, error, data, refetch, cacheHit } = useQuery(PROFILES_QUERY)

    const typeMap = {
        "0": "Admin",
        "1": "Student",
        "2": "Academician",
        "3": "Industry",
        "4": "International"
    }

    const getTypeName = (type) => {
        try {
            return typeMap[type]
        } catch (e) {
            return ''
        }
    }

    return loading ? <div>Loading</div> :
    <div>
        {data.profiles.length > 0 ?
        <div>
            <h2>Registrations</h2>
            <table className="table bg-white p-2">
                <thead className="font-weight-bold">
                    <td>#</td>
                    <td>Name</td>
                    <td>Type</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Status</td>
                    <td>Date Joined</td>
                </thead>
                <tbody>
                {data.profiles.map((s, index) =>
                    <tr>
                        <td>{index+1}</td>
                        <td>{s.name}</td>
                        <td>{getTypeName(s.type)}</td>
                        <td>{s.phone}</td>
                        <td>{s.email}</td>
                        <td>{
                            !s.isProfileComplete ? "Incomplete Profile" :
                                s.requiresCorrection ? "Correction Requested" :
                                    !s.isIDVerified ? "Pending Verification" :
                                        "Verified"
                        }</td>
                        <td>{s.dateJoined}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        : <div>No Registration Data Found</div>}
    </div>
};

export default AccountsViewer;