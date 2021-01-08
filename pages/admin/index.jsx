import React from 'react';

import Base from "../../src/components/shared/Base";
import AdminPanel from "../../src/components/admin";
import ViewAuthenticator from "../../src/components/shared/ViewAuthenticator";
import Header from "../../src/components/shared/Header";
import RegistrationForm from "../../src/components/registration/RegisterForm";

export default () => {

    return <ViewAuthenticator
        renderAdmin={() =>
            <Base meta={{ title: 'Admin Panel' }}>
                <Header />
                <div className="container-lg px-2 py-5">
                    <AdminPanel />
                </div>
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
    />

};