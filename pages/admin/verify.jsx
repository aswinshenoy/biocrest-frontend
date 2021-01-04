import React from 'react';

import Base from "../../src/components/shared/Base";

import ViewAuthenticator from "../../src/components/shared/ViewAuthenticator";
import AccountsVerifier from "../../src/components/admin/AccountsVerifier";
import Header from "../../src/components/shared/Header";

export default () => {

    return <ViewAuthenticator
        renderAdmin={() =>
            <Base meta={{ title: 'Verify Registrations' }}>
                <Header />
                <div className="container-lg px-2 py-5">
                    <AccountsVerifier />
                </div>
            </Base>
        }
    />;

};