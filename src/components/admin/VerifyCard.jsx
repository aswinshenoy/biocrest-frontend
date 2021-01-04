import React, {useState} from 'react';
import styled from "@emotion/styled";
import {useMutation} from "graphql-hooks";
import {APPROVE_REGISTRATION_MUTATION, REJECT_VERIFICATION} from "../../graphql/queries/user";

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
                    type: profile.type
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
                                <div className="col-md-6 p-2">
                                    <label>Name</label>
                                    <TextInput
                                        label="Name" placeholder="Full Name"
                                        value={profile?.name}
                                        onChange={(v) => setProfile({...profile, name: v })}
                                    />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label>Type</label>
                                    <StyledInput as="select" name="type" value={profile.type} onChange={(e) => setProfile({ ...profile, type: e.currentTarget.value })}>
                                        <option value={1}>Student</option>
                                        <option value={2}>Academician</option>
                                        <option value={3}>Industry</option>
                                        <option value={4}>International</option>
                                    </StyledInput>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0">
                            <div className="col-md-6 p-2">
                                <label>Phone Number</label>
                                <div className="d-flex">
                                    <TextInput
                                        label="Phone Number" placeholder="Phone Number"
                                        value={profile?.phone}
                                        onChange={(v) => setProfile({...profile, phone: v })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 p-2">
                                <label>Phone Number</label>
                                <div className="d-flex">
                                    <TextInput
                                        label="Email" placeholder="Email Address"
                                        value={profile?.email}
                                        onChange={(v) => setProfile({...profile, email: v })}
                                    />
                                </div>
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