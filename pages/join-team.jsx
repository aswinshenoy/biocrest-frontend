import React from 'react';
import ViewAuthenticator from "../src/components/shared/ViewAuthenticator";
import Base from "../src/components/shared/Base";
import Header from "../src/components/shared/Header";
import AdminPanel from "../src/components/admin";
import RegistrationForm from "../src/components/registration/RegisterForm";
import JoinTeam from "../src/components/teams/JoinTeam";

const JoinTeamPage = () => {

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
            <Base meta={{ title: 'Join A Team' }}>
                <Header />
                <div className="container my-3">
                    <JoinTeam />
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

export default JoinTeamPage;