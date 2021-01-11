import React, {useEffect, useState} from 'react';
import Select from "../ui/form/Select";
import {Col, Row} from "srx";
import FormButton from "../ui/styled-components/Button";
import SmartSelect from "../ui/form/SmartSelect";
import Radio from "../ui/form/Radio";
import MultiSelect from "../ui/form/MultiSelect";

const EventFields = ({
     userType, eventProfile, onSave = () => {},
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

    const filteredOptions = (options) => {
        if(options?.length > 0){
            return options.filter((o) => o.allowedUserTypes == null ||o.allowedUserTypes?.includes(parseInt(userType)));
        }
        return options;
    };

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>Biocrest Registration</h2>
        <Row>
            {eventProfile?.event?.formFields?.length > 0 ?
                eventProfile.event.formFields.map((f) =>
                f.type === 'select' ?
                    <Col md={6} p={2}>
                        <div className="w-100" style={{ zIndex: '6000' }}>
                            <Select
                                label={f?.label}
                                value={f?.key ? form[f.key] : null}
                                options={filteredOptions(f?.options)}
                                onChange={(v) => setForm({...form, [f.key]: v })}
                            />
                        </div>
                    </Col>:
                f.type === 'smartselect' ?
                    <Col md={6} p={2}>
                        <div className="w-100" style={{ zIndex: '6000' }}>
                            <SmartSelect
                                label={f?.label}
                                value={f?.key ? form[f.key] : null}
                                options={filteredOptions(f?.options)}
                                onChange={(v) => setForm({...form, [f.key]: v })}
                            />
                        </div>
                    </Col>:
                f.type === 'radio' ?
                    <Col md={12} p={2}>
                        <div className="w-100" style={{ zIndex: '6000' }}>
                            <Radio
                                label={f?.label}
                                value={f?.key ? form[f.key] : null}
                                name={f.key}
                                options={filteredOptions(f?.options)}
                                onChange={(v) => setForm({...form, [f.key]: v })}
                            />
                        </div>
                    </Col> :
                f.type === 'multiselect' ?
                    <Col md={6} p={2}>
                        <div className="w-100" style={{ zIndex: '6000' }}>
                            <MultiSelect
                                label={f?.label}
                                value={f?.key ? form[f.key] : null}
                                options={filteredOptions(f?.options)}
                                onChange={(v) => setForm({...form, [f.key]: v })}
                            />
                        </div>
                    </Col>
                : <div>Unsupported Field</div>
            ) : null}
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