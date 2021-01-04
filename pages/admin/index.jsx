import React from 'react';

import Base from "../../src/components/shared/Base";
import AdminPanel from "../../src/components/admin";
import ViewAuthenticator from "../../src/components/shared/ViewAuthenticator";
import Header from "../../src/components/shared/Header";

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
    />

};