import React, {useEffect, useState} from 'react';
import {useQuery} from "graphql-hooks";
import {TextInput} from "srx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { CSVLink } from "react-csv";

import {PROFILES_QUERY} from "../../graphql/queries/user";

const AccountsViewer = () => {

    const { loading, error, data, refetch } = useQuery(PROFILES_QUERY)

    const typeMap = {
        "0": "Admin",
        "1": "Student",
        "2": "Academician",
        "3": "Industry"
    }

    const getTypeName = (type) => {
        try {
            return typeMap[type]
        } catch (e) {
            return ''
        }
    };

    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const fetchAgain = () => {
        refetch({
            variables: { key: keyword, filters: { type, startDate: startDate?.toISOString().substring(0, 10), endDate: endDate?.toISOString().substring(0, 10) } },
            updateData(previousData, data) {
                return data;
            }
        })
    }
    const handleSearch = (e) => {
        e.preventDefault();
        fetchAgain()
    };

    useEffect(fetchAgain, [type, startDate, endDate]);

    const generateCSVData = () => {
        const d = [];
        d.push(['#', 'Name', 'Type', 'Phone', 'Email', 'Status', 'Date Joined'])
        if(data?.profiles.length > 0){
            data?.profiles.forEach((s, index) =>
                d.push([
                    `${index+1}`,
                    `${s.name}`,
                    `${getTypeName(s.type)}`,
                    `${s.phone}`,
                    `${s.email}`,
                    `${
                        !s.isProfileComplete ? "Incomplete Profile" :
                            s.requiresCorrection ? "Correction Requested" :
                                !s.isIDVerified ? "Pending Verification" :
                                    "Verified"
                    }`,
                    `${format(parseISO(s.dateJoined), 'hh:MM a, dd-MM-yyyy')}`
                ])
            )
        }
        return d;
    }


    return error ? <div>Error occurred while loading. Please refresh to retry</div> :
    loading ? <div>Loading</div> :
    <div>
        <div>
            <h2 className="mb-2">Registrations</h2>
            <div className="mb-4">
                View all registered users
            </div>
            <div className="my-2">
                <div className="bg-white p-2">
                    <div className="row w-100 mx-0">
                        <div className="col-md-4 p-1">
                            <form className="d-flex align-items-center" onSubmit={handleSearch}>
                                <TextInput
                                    className="w-100"
                                    label="Search" name="search"
                                    placeholder="Search by name, phone or email"
                                    value={keyword} onChange={setKeyword}
                                />
                                <button className="btn btn-primary p-2" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="col-md-4 d-flex align-items-center p-1">
                            <select
                                value={type}
                                onChange={(e) => setType(e.currentTarget.value)}
                                className="w-100 px-3 py-2"
                            >
                                <option value={null}>All</option>
                                <option value={1}>Student</option>
                                <option value={2}>Academician</option>
                                <option value={3}>Industry</option>
                            </select>
                        </div>
                        <div className="col-md-4 d-flex align-items-center p-1">
                            <div className="p-1">
                                <label className="mb-0">From</label>
                                <DatePicker selected={startDate} onChange={setStartDate} />
                            </div>
                            <div className="p-1">
                                <label className="mb-0">To</label>
                                <DatePicker selected={endDate} onChange={setEndDate} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {data?.profiles &&
            <div className="my-2">
                <div className="p-2 bg-white">
                    <CSVLink
                        data={generateCSVData()}
                        filename={"registrations-export.csv"}
                        target="_blank"
                    >
                        Download CSV Export
                    </CSVLink>
                </div>
            </div>}
            {data?.profiles?.length > 0 ?
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
                {data?.profiles.map((s, index) =>
                    <tr>
                        <td>{index+1}.</td>
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
                        <td>{format(parseISO(s.dateJoined), 'hh:MM a, dd-MM-yyyy')}</td>
                    </tr>
                )}
                </tbody>
            </table> : <div>No Registration Data Found</div>}
        </div>
    </div>
};

export default AccountsViewer;