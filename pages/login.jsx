import React from 'react';

import RegistrationForm from "../src/components/registration/RegisterForm";
import OnBoarding from "../src/components/OnBoarding";

import DashboardPage from "../src/components/dashboard";
import Base from "../src/components/shared/Base";
import AdminPanel from "../src/components/admin";
import ViewAuthenticator from "../src/components/shared/ViewAuthenticator";
import Header from "../src/components/shared/Header";

const eventID = process.env.eventID;

const RegisterPage = () => {

    return <ViewAuthenticator
        renderAdmin={() =>
            <Base meta={{ title: 'Admin Panel' }}>
                <Header />
                <div className="container-lg px-2 py-5">
                    <AdminPanel eventID={eventID} />
                </div>
            </Base>
        }
        renderAuth={(userInfo) =>
            !userInfo?.isProfileComplete ?
                <Base meta={{ title: 'Complete Your Profile' }}>
                    <OnBoarding />
                </Base> :
                <Base meta={{ title: 'Dashboard' }}>
                    <DashboardPage />
                </Base>
        }
        renderPublic={() =>
            <Base meta={{ title: 'Login' }}>
                <RegistrationForm type="login" />
            </Base>
        }
    />;

};

export default RegisterPage;