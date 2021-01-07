import React, {useState} from 'react';
import styled from "@emotion/styled";
import {useMutation} from "graphql-hooks";
import Input from "../ui/form/Input";
import Select from "../ui/form/Select";
import PlacePicker from "../ui/form/PlacePicker";

import AffiliationBody from "../fields/AffiliationBody";
import AffiliationTitle from "../fields/AffiliationTitle";

const genders = require('../../data/commons/gender.json');
const userTypes = require('../../data/commons/user-types.json');
const userTitles = require('../../data/commons/user-titles.json');

import {APPROVE_REGISTRATION_MUTATION, REJECT_VERIFICATION} from "../../graphql/queries/verification";

const StyledInput = styled.input`
    padding: 0.5rem 1rem;
    font-size: 16px;
    width: 100%;
`;

const EditorForm = styled.div`
    label {
       display: block;
    }
`;

const TextInput = ({ as = 'input', label, placeholder, value, onChange }) => {
    return <StyledInput
        as={as}
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
    />
}

const VerifyCard = ({
    user, image, timestamp
}) => {

    const [isCompleted, setCompleted] = useState(false);
    const [profile, setProfile] = useState(user);
    const [remark, setRemark] = useState('');

    const [approveRegistration] = useMutation(APPROVE_REGISTRATION_MUTATION);
    const handleVerify = () => {
        approveRegistration({
            variables: {
                userID: profile.id,
                update: {
                    name: profile.name,
                    phone: profile.phone,
                    email: profile.email,
                    type: profile.type,
                    affiliationBodyID: profile?.affiliationBody?.value,
                    affiliationTitleID: profile?.affiliationTitle?.value
                },
                remarks: remark
            }
        }).then(({ data, error }) => {
            if(data?.approveRegistration){
                setCompleted(true)
            }
        });
    };

    const [rejectVerification] = useMutation(REJECT_VERIFICATION);
    const handleReject = () => {
        rejectVerification({
            variables: {
                userID: profile.id,
                remarks: remark
            }
        }).then(({ data, error }) => {
            if(data?.rejectVerification){
                setCompleted(true)
            }
        });
    };


    return isCompleted ? <div /> :
    <div className="card shadow-sm p-2">
        <div className="row mx-0">
            <div className="col-md-4 col-lg-6 px-1">
                <a href={image} target="_blank">
                    <img src={image} alt="ID Card" />
                </a>
            </div>
            {profile && <div className="col-md-8 col-lg-6">
                <EditorForm>
                    <div>
                        <div>
                            <div className="row mx-0">
                                <div className="col-12 d-flex align-items-center p-2">
                                    <Select
                                        label="Title"
                                        value={profile?.title}
                                        onChange={(v) => setProfile({...profile, title: v })}
                                        options={userTitles}
                                        className="mr-2"
                                    />
                                    <Input
                                        label="Name"
                                        placeholder="Enter your name"
                                        value={profile?.name}
                                        className="w-100"
                                        onChange={(name) => { setProfile({...profile, name}) }}
                                    />
                                </div>
                                <div className="col-md-6 p-2">
                                    <Select
                                        label="Type"
                                        value={profile?.type}
                                        onChange={(v) => setProfile({...profile, type: v })}
                                        options={userTypes}
                                        className="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-md-6 p-2">
                                <Select
                                    label="Gender"
                                    value={profile?.gender}
                                    onChange={(v) => setProfile({...profile, gender: v })}
                                    options={genders}
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6 p-2">
                                <PlacePicker
                                    label="Your City/Town"
                                    city={profile?.city}
                                    country={profile?.country}
                                    state={profile?.state}
                                    onChange={({ city, state, country }) => {
                                        setProfile({
                                            ...profile, city, state, country
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-md-6 p-2">
                                <AffiliationTitle
                                    value={profile?.affiliationTitle}
                                    onChange={(affiliationTitle) => setProfile({...profile, affiliationTitle })}
                                />
                            </div>
                            <div className="col-md-6 p-2">
                                <AffiliationBody
                                    value={profile?.affiliationBody}
                                    onChange={(affiliationBody) => setProfile({...profile, affiliationBody })}
                                />
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-md-6 p-2">
                                <Input
                                    label="Phone"
                                    placeholder="Enter phone"
                                    value={profile?.phone}
                                    autoComplete="email"
                                    type="email"
                                    className="w-100"
                                    onChange={(phone) => setProfile({...profile, phone}) }
                                />
                            </div>
                            <div className="col-md-6 p-2">
                                <Input
                                    label="Email"
                                    placeholder="Enter email"
                                    value={profile?.email}
                                    autoComplete="email"
                                    type="email"
                                    className="w-100"
                                    onChange={(email) => setProfile({...profile, email}) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <label>Remarks (only for rejecting)</label>
                        <TextInput
                            as="textarea"
                            label="Remark" placeholder="Remarks for rejecting, will be mailed to the participant"
                            value={remark}
                            onChange={(v) => setRemark(v)}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-end mt-2 p-2">
                        <button onClick={handleReject} className="btn btn-danger font-weight-bold mx-2 px-4 py-3">Reject</button>
                        <button onClick={handleVerify} className="btn btn-success font-weight-bold mx-1 px-4 py-3">Save & Approve</button>
                    </div>
                </EditorForm>
            </div>}
        </div>
    </div>

};

export default VerifyCard;