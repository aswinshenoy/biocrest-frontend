import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx";
import {useMutation} from "graphql-hooks";
import {UPDATE_MUTATION} from "../../../../graphql/queries/user";

import BasicInfoForm from "./basicInfo";
import UserTypeSelector from "./typeSelector";
import EmailVerifyCard from "./emailVerify";
import PhoneVerifyCard from "./phoneVerify";
import IDUploader from "./idUpload";
import {setUserInfo, useAuthState} from "../../../../states";
import Header from "../../../shared/Header";

const OnBoardWrap = styled.div`
    background: #EFEFEF;
    color: black;
    min-height: 100vh;
`;

const StageButton = styled.button`
  background: ${({ active, complete }) => complete ? '#00BFA5!important' : active ? 'white!important' : 'none!important'};
  border: none!important;
  border-radius: 0;
  color: ${({active}) => active ? 'black!important' : '#444!important'};;
  padding: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 14px;
  text-align: left;
  img {
    width: 45px;
    margin-right: 10px;
  }
  &:focus, hover {
    outline: none!important;
  }
`;

const BodyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
`;

const BodyCol = styled(Col)`
    margin-bottom: 5vh;
    @media (min-width: 768px) {
        min-height: 60vh;
        margin-bottom: 0;
    }
`

const OnBoarding = () => {

    const [profile] = useAuthState('userInfo');
    const [isSubmitting, setSubmitting] = useState(false);

    const stages_list = [
        {
            "value": "basic_profile",
            "label": "Basic Info",
            "icon": require('../../../../assets/icons/teacher.png'),
        },
        {
            "value": "type_select",
            "label": "Profile Type",
            "icon": require('../../../../assets/icons/type.png'),
        },
        {
            "value": "email_verify",
            "label": "Verify Email",
            "icon": require('../../../../assets/icons/email.png'),
        },
        {
            "value": "phone_verify",
            "label": "Verify Phone",
            "icon": require('../../../../assets/icons/phone.png')
        },
        {
            "value": "id_upload",
            "label": "Upload ID Card",
            "icon": require('../../../../assets/icons/id_verify.png'),
        }
    ];

    const setActive = (stages, value) => {
        return stages.map((s) => {
            if(s.value === value)
                return { ...s, active: true }
            return s;
        });
    };

    const setCompleted = (stages, value) => {
        let flag = false;
        return stages.map((s) => {
            if(s.value === value)
                flag = true;
            if(flag === false)
                return { ...s, complete: true }
            return s;
        });
    };

    const getInitialState = () => {
        if(!(profile?.name.length > 0))
            return setCompleted(setActive(stages_list, 'basic_profile'), 'basic_profile');
        if(!profile?.type?.length > 0)
            return setCompleted(setActive(stages_list, 'type_select'), 'type_select');
        if(!profile?.emailVerified)
            return setCompleted(setActive(stages_list, 'email_verify'), 'email_verify');
        if(!profile?.phoneVerified)
            return setCompleted(setActive(stages_list, 'phone_verify'), 'phone_verify');
        return setCompleted(setActive(stages_list, 'id_upload'), 'id_upload');
    };

    const [stages, setStages] = useState([]);

    useEffect(() => {
        if(profile && stages.length === 0){
            setStages(getInitialState())
        }
    }, [profile])

    const changeStage = (curr, next) => {
        let newStages = stages.map((s) => {
            if(s.value === curr)
                return { ...s, active: false, complete: true }
            else if (s.value === next)
                return {...s, active: true }
            return s;
        });
        setStages([...newStages]);
    }

    const [updateProfile] = useMutation(UPDATE_MUTATION);
    const handleInfoComplete = (profile) => {
        setProfile(profile);
        updateProfile({
            variables: { update: { name: profile.name, email: profile.email, password: profile.password } }
        }).then(({ data, error }) => {
            if(data?.updateProfile?.success){
                console.log('updated');
            }
        })
        changeStage('basic_profile', 'type_select');
    }

    const handleTypeComplete = (type) => {
        setUserInfo({...profile, type});
        updateProfile({ variables: { update: { type } }}).then(({ data, error }) => {
            if(data?.updateProfile?.success){
                console.log('updated');
            }
        })
        changeStage('type_select', 'email_verify');
    };

    const handleVerifyEmail = (profile) => {
        setUserInfo(profile);
        changeStage('email_verify', 'phone_verify');
    };

    const handleVerifyPhone = (profile) => {
        setUserInfo(profile);
        changeStage('phone_verify', 'id_upload');
    };

    const handleUploadID = (profile) => {
        setSubmitting(true);
        updateProfile({ variables: { update: { idCard: profile.idCard } }}).then(({ data, error }) => {
            setSubmitting(false);
            if(data?.updateProfile?.success){
                setUserInfo({
                    ...profile,
                    isProfileComplete: true
                })
            }
        });
    }

    const openStage = (value) => {
        let newStages = stages.map((s) => {
            if(s.value === value) {
                return { ...s, active: true }
            } else if (s.active) {
                return {...s, active: false }
            } return s;
        });
        setStages([...newStages]);
    }

    const onOpen = (stage) => {
        if(stage.complete) {
            let newStages = stages.map((s) => {
                if(s.value === stage.value) {
                    return { ...s, active: true }
                } else if (s.active) {
                    return {...s, active: false }
                } return s;
            });
            setStages([...newStages]);
        }
    };

    const beforeStages = () => {
        const st = [];
        stages.every((s) => {
            st.push(s);
            return !s.active;
        });
        return st;
    };

    const afterStages = () => {
        const st = [];
        let over = false;
        stages.forEach((s) => {
            if(over) st.push(s);
            if(s.active) over = true;
        })
        return st;
    };

    const renderStages = (s) =>
    s.map((s) =>
        <StageButton onClick={() => onOpen(s)} disabled={!s?.complete&&!s?.active} complete={s?.complete && !s.active} active={s?.active}>
            {s.complete && !s.active ?
                <img
                    src={require('../../../../assets/icons/tick_box.png')}
                    alt="completed" draggable="false"
                /> :
                <img alt={s.label} draggable="false" src={s.icon} />
            }
            <div>{s.label}</div>
        </StageButton>
    );

    const renderSubmitting = () =>
    <BodyContainer>
        <div className="text-center">
            <h1 className="mb-3">Registering</h1>
            <div className="d-flex justify-content-center">
                <p style={{ maxWidth: '75%' }}>Please hold on a second while we process your registration.</p>
            </div>
        </div>
    </BodyContainer>;

    const renderForm = () =>
    <BodyContainer>
        <div className="container px-0" style={{ maxWidth: '1200px' }}>
            <Row>
                <Col md={3} p={0}>
                    <div className="d-md-block d-none">
                        {renderStages(stages)}
                    </div>
                    <div className="d-block d-md-none">
                        {renderStages(beforeStages())}
                    </div>
                </Col>
                <BodyCol md={9} py={3}>
                    <section className="pt-3 px-2">
                        {stages.filter((s) => s.active === true).map((s) => {
                            if(s.value === 'basic_profile')
                                return <BasicInfoForm profile={profile} onSave={handleInfoComplete} />;
                            if (s.value === 'type_select')
                                return <UserTypeSelector
                                    type={profile?.type ? parseInt(profile.type) : null}
                                    onComplete={handleTypeComplete}
                                />;
                            if(s.value === 'email_verify')
                                return <EmailVerifyCard
                                    profile={profile}
                                    onVerify={handleVerifyEmail}
                                    onRequestChange={() => openStage('basic_profile')}
                                />;
                            if(s.value === 'phone_verify')
                                return <PhoneVerifyCard profile={profile} onVerify={handleVerifyPhone} />
                            if(s.value === 'id_upload')
                                return <IDUploader profile={profile} onContinue={handleUploadID} />
                            return <div/>
                        })}
                    </section>
                </BodyCol>
                <Col md={3} p={0}>
                    <div className="d-block d-md-none">
                        {renderStages(afterStages())}
                    </div>
                </Col>
            </Row>
        </div>
    </BodyContainer>;


    return <OnBoardWrap>
        <Header />
        {(profile && !profile?.isProfileComplete) ? (isSubmitting ? renderSubmitting() : renderForm()) : <div />}
    </OnBoardWrap>;

};

export default OnBoarding;