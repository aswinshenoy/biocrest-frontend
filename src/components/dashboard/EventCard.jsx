import React from 'react';
import {Card} from "srx";
import styled from "@emotion/styled";

const EventCardWrap = styled.a`
    display: block;
    transform: translateY(0);
    transition: 0.5s all ease;
    &:hover {
      transform: translateY(-5px);
      transition: 0.5s all ease;
    }
`;

const EventCard = ({
    coverURL, slug, name, shortDescription
}) => {

    return <EventCardWrap href={`/event/${slug}`} className="plain-link">
        <Card bg="white" p={0} shadow={2} round={0}>
            {coverURL && <img draggable="false" src={coverURL} alt={name} />}
            <div className="p-3">
                <h3 style={{ color: '#AF0C3E', fontWeight: '600' }}>{name}</h3>
                <div>{shortDescription}</div>
            </div>
        </Card>
    </EventCardWrap>;

};

export default EventCard;