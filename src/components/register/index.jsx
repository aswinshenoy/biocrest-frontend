import React, { useState } from 'react';
import {useMutation} from "graphql-hooks";

import EventFieldsForm from "../fields/EventForm";
import {PARTICIPATE_MUTATION, SUBMIT_MUTATION} from "../../graphql/queries/event";
import TeamPicker from "../teams/TeamPicker";
import FormButton from "../ui/styled-components/Button";

const EventRegister = ({ event, onRegister = () => {} }) => {

    const [participate] = useMutation(PARTICIPATE_MUTATION);
    const [submit] = useMutation(SUBMIT_MUTATION);
    const [teamID, setTeamID] = useState(null);
    const [isTeamCreated, setTeamCreated] = useState(false);

    const processRegistration = (s) => {
        const filesToUpload = [];
        const sanitizedData = {};
        Object.keys(s).forEach((k) => {
            if(s[k].file){
                filesToUpload.push({
                    key: k,
                    file: s[k].file?.file,
                })
            } else {
                sanitizedData[k] = s[k];
            }
        });
        participate({ variables: {
            eventID: event.id, data: JSON.stringify(sanitizedData)
        }}).then(({ data, error}) => {
            if(!error && data?.participate){
                const participantID = data?.participate.id;
                filesToUpload.forEach( async(f) => {
                    await submit({ variables: {
                        participantID, file: f.file, key: f.key
                    }}).then(({ data, error }) => {
                        if(!error){
                            return true;
                        }
                    })
                })
                onRegister(data);
            }
        })
    };


    return teamID || !event.isTeamEvent ?
    <div className="container p-2 my-3 d-flex align-items-center justify-content-center">
        <div className="bg-white p-3 shadow-sm" style={{ width: '720px', maxWidth: '100%' }}>
            {event.formFields?.length > 0 ?
            <EventFieldsForm
                {...event}
                eventName={event.name}
                onSave={processRegistration}
            /> :
            <div className="text-center">
                <h1>Register for {event.name}</h1>
                <FormButton
                    text="Register"
                    onClick={() => processRegistration({})}
                    py={4} px={5} round={0}
                />
            </div>}
        </div>
    </div> :
    <div>
        <div className="container p-2 my-3 d-flex align-items-center justify-content-center">
            <div>
                <h2 style={{ color: '#AF0C3E', fontWeight: '600' }}>Choose a Team</h2>
                <TeamPicker onPick={setTeamID} />
            </div>
        </div>
    </div>

};

export default EventRegister;