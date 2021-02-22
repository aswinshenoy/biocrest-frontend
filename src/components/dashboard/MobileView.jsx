import React, { useState } from 'react';
import styled from '@emotion/styled';
import CompetitionsListing from "./CompetionListing";
import WebinarListing from "./WebinarListing";
import MyProfile from "./MyProfile";
import SubmissionFeed from "./Feed";
import UpcomingEvents from "./UpcomingEvents";

const FooterBar = styled.div`
    background: white;
    box-shadow: -5px -2px 8px rgba(0,0,0,0.45);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
`;

const TabSwitch = styled.button`
  padding: 0.5rem 0.35rem;
  width: 20%;
  font-size: 8px;
  margin-right: 5px;
  cursor: pointer;
  background: none!important;
  color: ${({ active }) => active ? '#a02541' : `#555` };
  font-weight: ${({ active }) => active ? 600 : 300 };
  border: none!important;
  text-align: center;
  img {
      width: ${({ active }) => active ? '36px' : `32px` };
      display: block;
      margin-bottom: 2px;
  }
  &:focus {
      outline: none!important;
  }
`;

const MobileView = ({
  defaultTab = 'competition'
}) => {

    const [currentTab, setTab] = useState(defaultTab)

    return <React.Fragment>
        <div className="p-1">
            {currentTab === 'dashboard' ?
            <div>
                <UpcomingEvents />
            </div> :
            currentTab === 'feed' ?
                <SubmissionFeed /> :
            currentTab === 'competition' ?
            <CompetitionsListing /> :
            currentTab === 'webinar' ?
            <WebinarListing /> :
            currentTab === 'profile' ?
            <MyProfile /> :
            null}
        </div>
        <div style={{ height: '64px' }} />
        <FooterBar>
            <TabSwitch
                active={currentTab === 'dashboard'}
                onClick={() => setTab('dashboard')}
            >
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt="dashboard" draggable="false"
                        src={require('../../assets/icons/dashboard.png')}
                    />
                </div>
                Dashboard
            </TabSwitch>
            <TabSwitch
                active={currentTab === 'feed'}
                onClick={() => setTab('feed')}
            >
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt="schedule" draggable="false"
                        src={require('../../assets/icons/feed.png')}
                    />
                </div>
                Feed
            </TabSwitch>
            <TabSwitch
                active={currentTab === 'profile'}
                onClick={() => setTab('profile')}
            >
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt="competition" draggable="false"
                        src={require('../../assets/icons/profile.png')}
                    />
                </div>
                My BioCrest
            </TabSwitch>
            <TabSwitch
                active={currentTab === 'competition'}
                onClick={() => setTab('competition')}
            >
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt="competition" draggable="false"
                        src={require('../../assets/icons/competition.png')}
                    />
                </div>
                Competitions
            </TabSwitch>
            <TabSwitch
                active={currentTab === 'webinar'}
                onClick={() => setTab('webinar')}
            >
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt="schedule" draggable="false"
                        src={require('../../assets/icons/conference.png')}
                    />
                </div>
                Schedule
            </TabSwitch>
        </FooterBar>
    </React.Fragment>


};

export default MobileView;