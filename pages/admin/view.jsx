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
                <div className="container-lg px-2 py-5">
                    <AccountsViewer />
                </div>
            </Base>
        }
        renderPublic={() =>
            <Base meta={{ title: 'Registration' }}>
                <RegistrationForm />
            </Base>
        }
    />;

};