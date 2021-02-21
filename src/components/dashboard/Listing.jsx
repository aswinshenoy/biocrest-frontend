import React, { useState } from 'react';
import styled from '@emotion/styled';
import CompetitionsListing from "./CompetionListing";
import WebinarListing from "./WebinarListing";
import SubmissionFeed from "./Feed";

const TabSwitch = styled.button`
  padding: 1rem;
  font-size: 18px;
  margin-right: 5px;
  cursor: pointer;
  background: ${({ active }) => active ? '#a02541' : `none` };
  color: ${({ active }) => active ? 'white' : `#a02541` };
  border: none!important;
  display: flex;
  align-items: center;
  text-align: left;
  line-height: 1;
  img {
      width: 33px;
  }
  &:focus {
      outline: none!important;
  }
  &:hover {
      background: #901591;
      color: white;
      outline: none!important;
  }
`;

const EventListing = ({
    defaultTab = 'competition'
}) => {

    const [currentTab, setTab] = useState(defaultTab)

    return <div>
        <div className="d-flex align-items-center bg-white">
            <TabSwitch
                active={currentTab === 'competition'}
                onClick={() => setTab('competition')}
            >
                <div className="d-flex justify-content-center">
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
                <div className="d-flex justify-content-center">
                    <img
                        alt="webinar" draggable="false"
                        src={require('../../assets/icons/conference.png')}
                    />
                </div>
                Schedule
            </TabSwitch>
            <TabSwitch
                active={currentTab === 'feed'}
                onClick={() => setTab('feed')}
            >
                <div className="d-flex justify-content-center">
                    <img
                        alt="feed" draggable="false"
                        src={require('../../assets/icons/feed.png')}
                    />
                </div>
                Submission Feed
            </TabSwitch>
        </div>
        <div className="p-2">
            {currentTab === 'competition' ?
                <CompetitionsListing /> :
            currentTab === 'webinar' ?
                <WebinarListing /> :
            currentTab === 'feed' ?
                <SubmissionFeed />
            : null}
        </div>
    </div>

};

export default EventListing;