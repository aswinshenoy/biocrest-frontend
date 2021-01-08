import React, {useEffect, useState} from 'react';
import Select from "../ui/form/Select";
import {Col, Row} from "srx";
import FormButton from "../ui/styled-components/Button";

const EventFields = ({
     eventProfile, onSave = () => {},
}) => {

    const getFormData = () => {
        if(eventProfile?.formData?.length > 0){
            const obj = {}
            eventProfile.formData.forEach((f) => {
                obj[f.key] = f.value;
            })
            return obj
        }
        return {}
    }

    const [form, setForm] = useState(getFormData());

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    useEffect(() => {
        setForm(getFormData());
    }, [eventProfile]);

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>Conference Preferences</h2>
        <Row>
            {eventProfile?.event?.formFields?.length > 0 ?
            <div>{eventProfile.event.formFields.map((f) =>
                <Col md={6} p={2} className="d-flex align-items-center">
                    {f.type === 'select' ?
                        <Select
                            label={f?.label}
                            value={f?.key ? form[f.key] : null}
                            options={f?.options}
                            onChange={(v) => setForm({...form, [f.key]: v })}
                        />
                    : <div>Unsupported Field</div>}
                </Col>
            )}</div> : null}
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                <FormButton
                    text="Continue"
                    type="submit" fw
                    py={4} px={5} round={0}
                />
            </Col>
        </Row>
    </form>;

};

export default EventFields;