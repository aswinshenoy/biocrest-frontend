import React from 'react';
import Head from "next/head";
import config from 'react-reveal/globals';
import {ClientContext, GraphQLClient} from 'graphql-hooks'

config({ ssrFadeout: true });

import '../../styles/bootstrap.min.css';
import '../../styles/styles.css';
import 'srx/styles/styles.css';

const seoTags = {
    "siteName": "BIOCREST 2021",
    "tagLine": "International Symposium on Antimicrobial Resistance",
    "description": "BIOCREST 2021 - An International Symposium on Antimicrobial Resistance organized by Amrita Vishwa Vidyapeetam. Register Today, limited seats available."
};

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';


const Base = ({ children, meta }) => {

    const title = `${meta && meta.title ? `${meta.title} |` : '' } ${seoTags.siteName} - ${seoTags.tagLine}`;
    const GoogleAnalyticsID = null;

    const client = new GraphQLClient({
        url: graphQLEndpoint,
    });

    return <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8'/>
            <meta name='theme-color' content='#AF0C3E' />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name="description" content={meta && meta.description ? meta.description : seoTags.description} />
            <meta name="twitter:title" content={title} />
            <meta property="og:title" content={title} />
            {   meta && meta.image && <meta property="og:image" content={meta.image} /> }
            <meta name="viewport" content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1" />
            <link rel="manifest" href="/manifest.json" />
            <link href='/images/icons/icon-72x72.png' rel='icon' type='image/png' sizes='72x72' />
            <link href='/images/icons/icon-96x96.png' rel='icon' type='image/png' sizes='96x96' />
            <link href='/images/icons/icon-128x128.png' rel='icon' type='image/png' sizes='128x128' />
            <link href='/images/icons/icon-152x152.png' rel='icon' type='image/png' sizes='144x144' />
            <link href='/images/icons/icon-152x152.png' rel='icon' type='image/png' sizes='152x152' />
            <link href='/images/icons/icon-180x180.png' rel='icon' type='image/png' sizes='180x180' />
            <link rel='apple-touch-icon' href='/images/icons/icon-180x180.png' />
            <link rel="shortcut icon" href="../images/icons/icon-72x72.png" />
            {GoogleAnalyticsID && <React.Fragment>
                <script rel="preconnect" async src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsID}`} />
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GoogleAnalyticsID}');`
                }} />
            </React.Fragment>}
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <div className="app">
            <ClientContext.Provider value={client}>
                {children}
            </ClientContext.Provider>
        </div>
    </React.Fragment>
};

export default Base;