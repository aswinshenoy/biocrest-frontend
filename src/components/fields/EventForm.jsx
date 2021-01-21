import React, {useEffect, useState} from 'react';
import {Col, Row} from "srx";

import Select from "../ui/form/Select";
import FormButton from "../ui/styled-components/Button";
import SmartSelect from "../ui/form/SmartSelect";
import Radio from "../ui/form/Radio";
import MultiSelect from "../ui/form/MultiSelect";
import Checkbox from "../ui/form/Checkbox";
import Input from "../ui/form/Input";
import FileUploader from "../ui/form/FileUploader";

const EventSubmission = ({
    formats, isPublic, charLimit, key, label,
    isURL,
    onChange = () => {}
}) => {

    const [file, setFile] = useState(null);
    const [url, setURL] = useState(null);

    useEffect(() => {
        onChange(isURL ? { url } : { file })
    }, [file, url]);

    return <div>
        {isURL ?
        <div className="w-100">
            <Input
                className="w-100"
                value={url}
                onChange={setURL}
                label={label}
                type="url"
            />
        </div> :
        <div>
            {file ?
            <div>
                <label className="font-weight-bold">File Selected</label>
                <div>{file?.file?.name}</div>
            </div> :
            <FileUploader
                formats={formats}
                onUpload={setFile}
            />}
        </div>}
    </div>

};

const EventFieldsForm = ({
     eventName, userType, formData, formFields, onSave = () => {},
 }) => {

    const getFormData = () => {
        if(formData?.length > 0){
            const obj = {}
            formData.forEach((f) => {
                obj[f.key] = f.value;
            })
            return obj
        }
        return {}
    }

    const [form, setForm] = useState(getFormData());
    const [isChecked, setChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    useEffect(() => {
        setForm(getFormData());
    }, [formData]);

    const filteredOptions = (options) => {
        if(options?.length > 0){
            return options.filter((o) => o.allowedUserTypes == null ||o.allowedUserTypes?.includes(parseInt(userType)));
        }
        return options;
    };

    const renderInput = (f) =>
    <Col md={12} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <Input
                label={f?.label}
                value={f?.key ? form[f.key] : null}
                className="w-100"
                charLimit={f?.charLimit}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderTextArea = (f) =>
    <Col md={12} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <Input
                label={f?.label}
                value={f?.key ? form[f.key] : null}
                type="textarea"
                className="w-100"
                charLimit={f?.charLimit}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderSelect = (f) =>
    <Col md={6} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <Select
                label={f?.label}
                value={f?.key ? form[f.key] : null}
                options={filteredOptions(f?.options)}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderSmartSelect = (f) =>
    <Col md={6} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <SmartSelect
                label={f?.label}
                value={f?.key ? form[f.key] : null}
                options={filteredOptions(f?.options)}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderCheckbox = (f) =>
    <Col md={12} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <Checkbox
                label={f?.label}
                value={f?.key && form[f.key] ? JSON.parse(form[f.key]) : null}
                name={f.key}
                maxSelections={f?.maxSelections}
                options={filteredOptions(f?.options)}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderRadio = (f) =>
    <Col md={12} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <Radio
                label={f?.label}
                value={f?.key && form[f.key] ? JSON.parse(form[f.key]) : null}
                name={f.key}
                options={filteredOptions(f?.options)}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderMultiSelect = (f) =>
    <Col md={6} p={2}>
        <div className="w-100" style={{ zIndex: '6000' }}>
            <MultiSelect
                label={f?.label}
                value={f?.key && form[f.key] ? JSON.parse(form[f.key]): null}
                options={filteredOptions(f?.options)}
                maxSelections={f?.maxSelections}
                onChange={(v) => setForm({...form, [f.key]: v })}
            />
        </div>
    </Col>;

    const renderSubmission = (f) =>
    <Col md={12} p={2}>
        <EventSubmission
            {...f}
            onChange={(v) => setForm({...form, [f.key]: v })}
        />
    </Col>;

    return <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>{eventName} Registration</h2>
        <Row>
            {formFields?.length > 0 ?
                formFields.map((f) =>
                    f.type === 'input' ? renderInput(f) :
                    f.type === 'textarea' ? renderTextArea(f) :
                    f.type === 'select' ? renderSelect(f) :
                    f.type === 'smartselect' ? renderSmartSelect(f) :
                    f.type === 'checkbox'? renderCheckbox(f) :
                    f.type === 'radio' ? renderRadio(f) :
                    f.type === 'multiselect' ? renderMultiSelect(f) :
                    f.type === 'submission' ? renderSubmission(f)
                    : <div>Unsupported Field</div>
                ) : null}
            {formFields.some((f) => f.isPublic) &&
            <div className="mt-4 p-2 d-flex">
                <input
                    type="checkbox"
                    className="mr-2 mb-0"
                    id="authorizePublication"
                    name="authorize_publication"
                    checked={isChecked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <label htmlFor="authorizePublication" className="m-0 line-height-1">
                    I am aware that this content may be published for symposium publicity in any online platforms.
                </label>
            </div>}
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                {(
                    isChecked ||
                    formFields?.length === 0 ||
                    !(formFields?.length > 0 && formFields.some((f) => f.isPublic))
                ) &&
                <FormButton
                    text="Continue"
                    type="submit" fw
                    py={4} px={5} round={0}
                />}
            </Col>
        </Row>
    </form>;

};

export default EventFieldsForm;