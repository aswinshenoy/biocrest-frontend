import React from 'react';
import styled from "@emotion/styled";
import {Col, Row} from "srx"

import Base from "../src/components/shared/Base";
import RegistrationSideCover from "../src/components/registration/SideCover";
import RegistrationForm from "../src/components/registration/RegisterForm";

const RegisterPageWrapper = styled.main`
  width: 100%;
  .container-lg{
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      max-width: 900px;
  }

`

const RegisterPage = () => {


    return <Base meta={{ title: 'Registration' }}>
        <RegisterPageWrapper>
            <RegistrationForm />
        </RegisterPageWrapper>
    </Base>

};

export default RegisterPage;