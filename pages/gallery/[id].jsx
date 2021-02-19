import React from 'react';
import Base from "../../src/components/shared/Base";

import RegistrationForm from "../../src/components/registration/RegisterForm";
import ViewAuthenticator from "../../src/components/shared/ViewAuthenticator";
import SubmissionGallery from "../../src/components/GalleryPage";


const GalleryPage = ({ id }) => {

   return <ViewAuthenticator
       renderAdmin={() => <SubmissionGallery id={id} />}
       renderAuth={() => <SubmissionGallery id={id} />}
       renderPublic={() =>
       <Base meta={{ title: 'Registration' }}>
           <RegistrationForm />
       </Base>}
   />

}

GalleryPage.getInitialProps = async ({ query }) => {
    return { id: query.id };
};

export default GalleryPage;