import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Button, Col, Row, TextInput} from "srx";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const FormInput = styled(TextInput)`
    input { 
      font-size: 15px!important; 
      border: 1px solid #AF0C3E!important; 
      margin: 1px;
      padding: 8px 10px; 
      margin-top: 0.35rem!important;
      &:focus {
        border: 2px solid #AF0C3E!important;
        margin: 0;
      }
    }
    label { 
      font-size: 12px; 
      font-weight: 500!important; 
    }
`;

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


const BasicInfoForm = ({
    profile: profileProp, onSave = () => {},
}) => {

    const [profile, setProfile] = useState(profileProp);
    const [valueChanged, setValueChanged] = useState(false);
    const [place, setPlace] = useState(null);
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(profile);
    };

    useEffect(() => {
        if(place){
            setValueChanged(true);
            setShowLocationPicker(false)
            setProfile({
                ...profile,
                city: place?.value?.terms[0].value,
                state: place?.value?.terms.length > 2 ? place?.value?.terms[1].value : null,
                country: place?.value?.terms[place?.value?.terms.length - 1].value
            })
        }
    }, [place]);

    useEffect(() => {
        if(!profile.country?.length > 0){
            setShowLocationPicker(true);
        }
    });

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>About You</h2>
        <Row>
            <Col md={6} p={1}>
                <FormInput
                    label="Name"
                    name="name"
                    title="Please enter your name"
                    value={profile?.name}
                    onChange={(name) => { setValueChanged(true); setProfile({...profile, name}) }}
                    placeholder="Enter Your Name"
                    alwaysShowLabel
                    isRequired
                />
            </Col>
            <Col md={6} p={1}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={profile?.email}
                    onChange={(email) => { setValueChanged(true); setProfile({...profile, email}) }}
                    autoComplete="email"
                    placeholder="Enter Your Email"
                    alwaysShowLabel
                    isRequired
                />
            </Col>
            <Col md={6} p={1}>
                <label style={{ fontWeight: 500 }} className="px-1 text-dark">Your Locality / Town / City</label>
                {!showLocationPicker ?
                <div style={{ fontSize: '15px' }} className="d-flex align-items-center p-1">
                    {profile?.city}, {profile?.state}, {profile?.country}
                    <button className="btn btn-primary px-1 small py-0 ml-2" type="button" onClick={() => setShowLocationPicker(true)}>(Change)</button>
                </div> :
                <GooglePlacesAutocomplete
                    apiKey="AIzaSyDgv-EZdSfVUJViYdrcbaxGOdHWsX5AaN8"
                    autocompletionRequest={{ types:  ['(cities)'] }}
                    selectProps={{
                        value: place, onChange: setPlace, placeholder: "Enter your locality"
                    }}
                />}
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

export default BasicInfoForm;