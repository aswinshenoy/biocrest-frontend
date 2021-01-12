import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from '@emotion/styled';
import {Button, Col, Row} from "srx";
import FormButton from "../ui/styled-components/Button";

const FileSelectorWrap = styled.div`
  background-color: white;
  padding:1rem;
  max-width: 550px;
  h4 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .dropzone {
    border: 2px dashed rgba(0,0,0,0.4);
    padding: 5vh 2.5vw;
    border-radius: 0.5rem;
    button {
        border-radius: 0.25rem;
        font-size: 1.25rem;
        background: #AF0C3E;
        color: white;
    }
  }
`;


const IDUploader = ({ profile, onContinue = () => {} }) => {

    const [hasChanged, setChanged] = useState(false);
    const [file, setFile] = useState(
        profile?.idCard ? {url: URL.createObjectURL(profile?.idCard) }  :
            profile?.IDCardURL ? { url: profile.IDCardURL }
            : null
    );
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({ noClick: true, noKeyboard: true });

    const getFileURL = (file) => {
        const fileSize = file.size / (1024 * 1024);
        if(fileSize < 50) return URL.createObjectURL(file);
        else return null;
    };

    const processFile = (file) => {
        return { file, url: getFileURL(file), };
    };

    useEffect(() => {
        if(acceptedFiles && acceptedFiles.length>0) {
            setChanged(true);
            setFile(processFile(acceptedFiles[0]));
        }
    }, [acceptedFiles]);

    const handleComplete = (e) => {
        onContinue({ ...profile, idCard: file.file })
    }

    return <div>
         <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="mb-3">Upload ID Card</h2>
        <p style={{ maxWidth: '600px' }}>
            We request you to upload a photo of your ID card, which we will use to manually verify your
            registration. Please make sure that details on the card are matching to the information provided,
            and are legible when you upload.
        </p>
        {file ?
        <React.Fragment>
            <div>
                <div className="font-weight-bold mb-2">Your ID Card</div>
                <div className="position-relative">
                    <img alt="Uploaded ID Card" src={file.url} className="shadow" style={{ width: '320px', maxWidth: '100%' }} />
                    <Button
                        variant="warning" round={0} onClick={() =>  { setFile(null); }}
                        text="Change" my={2} px={4} py={3}
                        className="position-absolute" style={{ bottom: 0, left: '5px' }}
                    />
                </div>
            </div>
        </React.Fragment> :
        <FileSelectorWrap>
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className="d-flex align-items-center justify-content-center">
                    <div>
                        <div className="d-flex justify-content-center">
                            <button
                                aria-label="Select Files to Send"
                                title="Select Files to Send"
                                className="btn rounded-0 px-5 py-3 shadow-lg"
                                type="button"
                                onClick={open}
                            >
                                Select File
                            </button>
                        </div>
                        <div className="p-2 mt-3 d-none d-md-block">
                            <span>You may also drag and drop the file here.</span>
                        </div>
                    </div>
                </div>
            </div>
        </FileSelectorWrap>}
        <Row>
            <Col md={8} />
            <Col md={4} p={2} className="mt-4" flexHR>
                {hasChanged && <FormButton
                    text="Complete Registration"
                    onClick={handleComplete} fw
                    py={4} px={5} round={0}
                />}
            </Col>
        </Row>
    </div>

};

export default IDUploader;