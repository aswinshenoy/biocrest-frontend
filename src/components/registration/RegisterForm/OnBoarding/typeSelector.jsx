import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Col, Row} from "srx";

const RoleButton = styled.button`
    background: ${({active, selected}) => active || !selected ? 'white' : '#DDD'};
    border: ${({ active, selected }) => active ? '5px solid #00BFA5!important' : selected ? '5px solid #DDD!important' : '5px solid white!important'};
    color: ${({ active }) => active ? 'green' : 'black'};
    border-radius: 0;
    width: 100%;
    padding: 5vh 1rem;
    transition: all 0.25s ease-in;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.5);
    h4 {
        margin-top: 1rem;
        margin-bottom: 0;
    }
    &:focus {
      outline: none!important;
    }
    &:hover {
      transform: translateY(-10px);
      transition: all 0.25s ease-in;
      background: white!important;
      border-color: white!important;
    }
`

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

const UserTypeSelector = ({
    type: typeProp, onComplete = () => {},
}) => {

    const [role, setRole] = useState(typeProp ? typeProp : null);

    const roles = [
        {
            "value": 1,
            "label": "Student",
            "icon": require('../../../../assets/icons/student.png')
        },
        {
            "value": 2,
            "label": "Academician",
            "icon": require('../../../../assets/icons/teacher.png')
        },
        {
            "value": 3,
            "label": "Industry",
            "icon": require('../../../../assets/icons/industry.png')
        },
        {
            "value": 4,
            "label": "International",
            "icon": require('../../../../assets/icons/international.png')
        },
    ]

    return <div>
        <h2 style={{ color: '#AF0C3E', fontWeight: '600' }} className="mb-3">We would like to know a little more about you</h2>
        <p>You would like to register as - </p>
        <Row py={2}>
            {roles.map((r) =>
                <Col key={`role-${r.value}-${r.label}`} s={6} lg={3} px={2} py={2}>
                    <RoleButton selected={role!==null} active={r.value===role} onClick={() => setRole(r.value)}>
                        <img
                            src={r.icon}
                            alt={r.label} draggable="false"
                        />
                        <h4 className="font-weight-bold">{r.label}</h4>
                    </RoleButton>
                </Col>
            )}
        </Row>
        {role !== null &&
            <Row className="px-2 mt-3 mb-5">
                <Col md={8} px={2} className="d-none d-md-block" />
                <Col md={4} px={0} className="mt-4" flexHR>
                    <FormButton
                        py={4} px={5} className="w-100" round={0}
                        onClick={() => onComplete(role)}
                    >
                        Continue
                    </FormButton>
                </Col>
            </Row>
        }
    </div>

};

export default UserTypeSelector;