import React, {useEffect, useState} from 'react';
import {TextInput} from "srx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default ({
    refetch = () => {}, isLoading
}) => {

    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);

    const reload = (e) => {
        e.preventDefault();
        refetch({ keyword, type, endDate, startDate });
    };

    useEffect(() => {
        refetch({ keyword, type, endDate, startDate });
    }, [type, endDate, startDate])

    return <div className="my-2">
        <div className="bg-white p-2">
            <div className="row w-100 mx-0">
                <div className="col-md-4 p-1">
                    <form className="d-flex align-items-center" onSubmit={reload}>
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

}