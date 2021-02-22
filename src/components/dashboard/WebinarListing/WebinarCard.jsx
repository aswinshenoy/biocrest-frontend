import React from 'react';
import {Card} from "srx";
import styled from "@emotion/styled";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const WebinarCardWrap = styled.div`
  display: block;
  transform: translateY(0);
  transition: 0.5s all ease;
  h3 {
    color: #AF0C3E;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: calc(1.1rem + 0.5vw);
  }
  p {
    margin-bottom: 0;
    font-size: calc(0.8rem + 0.3vw);
    line-height: 1.2;
  }
  &:hover {
    transform: translateY(-10px);
    transition: 0.5s all ease;
  }
  a {
    border: 2px solid #4125a0;
    color: #4125a0!important;
    font-weight: 600;
    padding: 0.35rem 0.5rem;
    display: inline-block;
    text-decoration: none!important;
    img {
      width: 28px;
      margin-right: 8px;
    }
    &:hover {
      background: rgba(20,0,80, 0.15);
    }
  }
`;

const DayWrap = styled.div`
    font-size: calc(1.1rem + 0.3vw);;
    font-weight: 600;
    margin-right: 6px;
    color: #39246a;
`;

const Timing = styled.div`
    font-size: calc(0.9rem + 0.2vw);
    color: #AF0C3E;
`;

const WebinarCard = ({
    posterURL, slug, name, shortDescription, registrationCloseTimestamp,
    startTimestamp, endTimestamp, webinarLink
}) => {

    const renderDates = () => {
        const st = parseISO(startTimestamp);
        const et = parseISO(endTimestamp);
        if(st && et && st.getDate() === et.getDate())
            return <div className="d-flex align-items-center">
                <DayWrap>
                    {format(st, 'dd MMM')}
                </DayWrap>
                <Timing>
                    {format(st, 'hh:mma')} - {format(et, 'hh:mma')}
                </Timing>
            </div>
    }

    return <WebinarCardWrap>
        <Card bg="white" p={1} shadow={2} round={0}>
            <div className="row mx-0">
                {/*<div className="col-4 p-2">*/}
                {/*    {posterURL && <img draggable="false" src={posterURL} alt={name} />}*/}
                {/*</div>*/}
                <div className="col-12 p-2">
                    {renderDates()}
                    <h3>{name}</h3>
                    <p>{shortDescription}</p>
                    {registrationCloseTimestamp && (parseISO(registrationCloseTimestamp) > new Date()) &&
                    <div style={{ fontSize: '13px' }} className="mt-2 text-danger">
                        Register before {format(parseISO(registrationCloseTimestamp), 'dd MMM')}
                    </div>}
                    {webinarLink &&
                    <a href={webinarLink} className="mt-3" target="_blank" rel="noreferrer nofollow">
                        <img
                            alt="Zoom" draggable="false"
                            src={require('../../../assets/icons/zoom_app.png')}
                        />
                        Open Zoom Meet
                    </a>}
                </div>
            </div>
        </Card>
    </WebinarCardWrap>;

};

export default WebinarCard;