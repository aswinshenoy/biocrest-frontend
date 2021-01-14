import React from 'react';

import Base from "../../src/components/shared/Base";
import ViewAuthenticator from "../../src/components/shared/ViewAuthenticator";
import Header from "../../src/components/shared/Header";
import AccountsViewer from "../../src/components/admin/AccountsViewer";
import RegistrationForm from "../../src/components/registration/RegisterForm";

export default () => {

    return <ViewAuthenticator
        renderAdmin={() =>
            <Base meta={{ title: 'Verify Registrations' }}>
                <Header />
                <AccountsViewer />
            </Base>
        }
        renderAuth={() =>
        <div>
            <h1>Access Denied</h1>
        </div>}
        renderPublic={() =>
            <Base meta={{ title: 'Registration' }}>
                <RegistrationForm />
            </Base>
        }
    />;

};