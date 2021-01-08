import React, {useState} from 'react';
import { Col, Row } from "srx";
import Fade from "react-reveal/Fade";

import Select from "../ui/form/Select";
import Input from "../ui/form/Input";
import PlacePicker from "../ui/form/PlacePicker";
import FormButton from "../ui/styled-components/Button";

const userTitles = require('../../data/commons/user-titles.json');
const genders = require('../../data/commons/gender.json');


const BasicInfoForm = ({
   profile: profileProp, onSave = () => {},
}) => {

    const [profile, setProfile] = useState(profileProp);
    const [valueChanged, setValueChanged] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(profile);
    };

    const renderUserTitleSelector = () =>
    <Select
        label="Title"
        value={profile?.title}
        onChange={(v) => setProfile({...profile, title: v })}
        options={userTitles}
        className="mr-2"
    />;

    const renderPlacePicker = () =>
    <Col md={6} p={2}>
        <PlacePicker
            label="Your City/Town"
            city={profile?.city}
            country={profile?.country}
            state={profile?.state}
            onChange={({ city, state, country }) => {
                setValueChanged(true);
                setProfile({
                    ...profile, city, state, country
                })
            }}
        />
    </Col>

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>About You</h2>
        <Row>
            <Col md={6} p={2} className="d-flex align-items-center">
                <Fade delay={150}>
                {renderUserTitleSelector()}
                <Input
                    label="Name"
                    placeholder="Enter your name"
                    value={profile?.name}
                    onChange={(name) => { setValueChanged(true); setProfile({...profile, name}) }}
                />
                </Fade>
            </Col>
            <Col md={6} p={2}>
                <Fade delay={250}>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={profile?.email}
                        autoComplete="email"
                        type="email"
                        className="w-100"
                        onChange={(email) => { setValueChanged(true); setProfile({...profile, email}) }}
                    />
                </Fade>
            </Col>
            {renderPlacePicker()}
            <Col md={6} p={2}>
                <Fade delay={450}>
                    <Select
                        label="Gender"
                        value={profile?.gender}
                        onChange={(v) => setProfile({...profile, gender: v })}
                        options={genders}
                    />
                </Fade>
            </Col>
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                <Fade delay={550}>
                    <FormButton
                        text={valueChanged ? "Save" : "Continue"}
                        type="submit" fw
                        py={4} px={5} round={0}
                    />
                </Fade>
            </Col>
        </Row>
    </form>

};

export default BasicInfoForm;