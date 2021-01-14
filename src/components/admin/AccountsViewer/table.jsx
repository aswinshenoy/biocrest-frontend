import React from 'react';
import styled from "@emotion/styled";
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {Waypoint} from "react-waypoint";

const StyledTable = styled.div`
    overflow-x: auto;
    max-width: 100%;
    max-height: 70vh;
    th {
      position: sticky;
      top: 0;
      left: 0;
      background: white;
      box-shadow: 2px 0px 5px rgba(0,0,0,0.3);
      border-bottom: 1px solid black;
    }
`

export default ({
    fields, profiles, loadMore = () => {}
}) => {

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

    const renderFormColumns = (formData) =>
    fields?.map((d) => {
        const list = formData.filter((fd) => fd.label === d.key)
        if(list?.length > 0){
            const item = list[0];
            try{
                if(d?.options?.length > 0){
                    const parsedValue = JSON.parse(item.value);
                    return <td>
                        {parsedValue.map((v) =>
                            <li>{v}</li>
                        )}
                    </td>
                }
                return <td>{data[0].value}</td>

            } catch (e) {
                return <td> - </td>
            }
        }
        return <td>-</td>
    })

    return <StyledTable>
        <table className="table bg-white p-2">
            <thead>
                <th style={{ minWidth: '40px' }}>#</th>
                <th style={{ minWidth: '150px' }}>Name</th>
                <th style={{ minWidth: '90px' }}>Type</th>
                <th style={{ minWidth: '180px' }}>Affiliation</th>
                <th style={{ minWidth: '90px' }}>Gender</th>
                <th style={{ minWidth: '90px' }}>Phone</th>
                <th style={{ minWidth: '150px' }}>Email</th>
                <th style={{ minWidth: '90px' }}>Date Joined</th>
                {fields?.map((d) =>
                    <th style={{ minWidth: '190px' }}>{d.label}</th>
                )}
            </thead>
            {profiles?.length > 0 ?
                <tbody>
                    {profiles.map(({ profile: s, formData }, index) =>
                        <tr>
                            <td>{index+1}.</td>
                            <td>{s.title}. {s.name}</td>
                            <td>{getTypeName(s.type)}</td>
                            <td>
                                {s?.affiliationTitle?.label}, {s?.affiliationBody?.label}
                            </td>
                            <td>{s.gender}</td>
                            <td>{s.phone}</td>
                            <td>{s.email}</td>
                            <td>{format(parseISO(s.dateJoined), 'hh:MM a, dd-MM-yyyy')}</td>
                            {renderFormColumns(formData)}
                        </tr>
                    )}
                    <Waypoint onEnter={loadMore}>
                        <div className="my-3 w-100 p-2">
                            <button onClick={loadMore} className="btn btn-primary p-3">Load More</button>
                        </div>
                    </Waypoint>
                </tbody> :
                <div className="w-100">No profiles found</div>}
        </table>
    </StyledTable>;

};
