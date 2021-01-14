import React from 'react';
import styled from "@emotion/styled";
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {Waypoint} from "react-waypoint";

const StyledTable = styled.div`
    overflow-x: auto;
    max-width: 100%;
    max-height: 70vh;
    thead {
      position: sticky;
      top: 0;
      left: 0;
    }
    tbody{
      max-height: 60vh;
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
            <thead className="font-weight-bold sticky-top">
                <td style={{ minWidth: '40px' }}>#</td>
                <td style={{ minWidth: '150px' }}>Name</td>
                <td style={{ minWidth: '90px' }}>Type</td>
                <td style={{ minWidth: '180px' }}>Affiliation</td>
                <td style={{ minWidth: '90px' }}>Gender</td>
                <td style={{ minWidth: '90px' }}>Phone</td>
                <td style={{ minWidth: '150px' }}>Email</td>
                <td style={{ minWidth: '90px' }}>Date Joined</td>
                {fields?.map((d) =>
                    <td style={{ minWidth: '190px' }}>{d.label}</td>
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
                        <div className="my-3 p-2">
                            <button onClick={loadMore} className="btn btn-primary p-3">Load More</button>
                        </div>
                    </Waypoint>
                </tbody> :
                <div>No profiles found</div>}
        </table>
    </StyledTable>;

};
