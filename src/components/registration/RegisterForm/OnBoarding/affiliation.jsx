import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Col, Row} from "srx";
import AsyncCreatableSelect from 'react-select/async-creatable';
import {useMutation, useQuery} from "graphql-hooks";
import debounce from "lodash/debounce";

import {
    ADD_AFFILIATION_BODY, ADD_AFFILIATION_TITLE,
    AFFILIATION_BODY_QUERY,
    AFFILIATION_TITLES_QUERY
} from "../../../../graphql/queries/affiliation";

const FormButton = styled(Button)`
    color: white!important;
    background: #AF0C3E!important;
    transition: all 0.25s ease-in;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.3);
    &:hover, &:focus{
       box-shadow: none!important;
       transition: all 0.25s ease-in;
    }
`;


const AffiliationForm = ({
   profile: profileProp, onSave = () => {},
}) => {

    const [profile, setProfile] = useState(profileProp);
    const [valueChanged, setValueChanged] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(profile);
    };

    const {
        loading: affiliationLoading,
        error: affiliationLoadError,
        data: titleList,
        refetch: refetchAffiliations
    } = useQuery(AFFILIATION_TITLES_QUERY)
    const [createAffiliationTitle] = useMutation(ADD_AFFILIATION_TITLE);
    const asyncLoadTitles = debounce((keyword, callback) => {
        refetchAffiliations({ variables: { keyword }}).then(({ data }) => {
            if(data?.affiliationTitles) {
                callback(data.affiliationTitles);
            }
        })
    }, 500);
    const renderTitle = titleList ? (
        <AsyncCreatableSelect
            id="affiliation-title-input"
            value={profile?.affiliationTitle}
            placeholder="Enter/Select Affiliation Title"
            onChange={(v) => { setValueChanged(true); setProfile({...profile, affiliationTitle: v })}}
            onCreateOption={(name) =>
                createAffiliationTitle({ variables: { name }}).then(({ data, error }) => {
                    if(data?.addAffiliationTitle){
                        setValueChanged(true);
                        setProfile({...profile, affiliationTitle: data.addAffiliationTitle });
                    }
                })
            }
            cacheOptions
            defaultOptions={titleList?.affiliationTitles}
            loadOptions={asyncLoadTitles}
        />
    ) : <div>Loading Options</div>;

    const {
        loading: bodyLoading,
        error: bodyError,
        data: bodyList,
        refetch: refetchBodies
    } = useQuery(AFFILIATION_BODY_QUERY)
    const [createAffiliationBody] = useMutation(ADD_AFFILIATION_BODY);
    const asyncLoadBodies = debounce((keyword, callback) => {
        refetchBodies({ variables: { keyword }}).then(({ data }) => {
            if (data?.affiliationBodies) {
                callback(data.affiliationBodies);
            }
        })
    }, 500);
    const renderBody = bodyList ? (
        <AsyncCreatableSelect
            id="affiliation-body-input"
            value={profile?.affiliationBody}
            placeholder="Enter/Select Affiliation Body"
            onChange={(v) => { setValueChanged(true); setProfile({...profile, affiliationBody: v })}}
            onCreateOption={(name) => createAffiliationBody({ variables: { name }}).then(({ data, error }) => {
                if(data?.addAffiliationBody){
                    setValueChanged(true);
                    setProfile({...profile, affiliationBody: data.addAffiliationBody });
                }
            })}
            cacheOptions
            defaultOptions={bodyList?.affiliationBodies}
            loadOptions={asyncLoadBodies}
        />
    ) : <div>Loading Options</div>;

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>Affiliation</h2>
        <p>The college, school, academic institution, organization or company you are affiliated with.</p>
        <Row>
            {(profile?.type === 1 || profile?.type === "1" ) &&
            <Col md={6} p={2}>
                <label style={{ fontWeight: 500 }} className="px-1 text-dark">Course</label>
                {renderTitle}
            </Col>}
            {(profile?.type === 2 || profile?.type === "2" ) &&
            <Col md={6} p={2}>
                <label style={{ fontWeight: 500 }} className="px-1 text-dark">Qualification</label>
                {renderTitle}
            </Col>}
            {(profile?.type === 3 || profile?.type === "3" )&&
            <Col md={6} p={2}>
                <label style={{ fontWeight: 500 }} className="px-1 text-dark">Job Title</label>
                {renderTitle}
            </Col>}
            <Col md={6} p={2}>
                <label style={{ fontWeight: 500 }} className="px-1 text-dark">{
                    profile?.type === 1 ? 'College / School' : profile?.type === 2 ? 'Institution' :
                        profile?.type === 3 ? 'Organization / Company' : 'Affiliation Body'
                }</label>
                {renderBody}
            </Col>
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                <FormButton
                    text={valueChanged ? "Save" : "Continue"}
                    type="submit" fw
                    py={4} px={5} round={0}
                />
            </Col>
        </Row>
    </form>

};

export default AffiliationForm;