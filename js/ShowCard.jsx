import React from 'react';
import styled from 'styled-components';
import carMetaData from '../car-meta-data';

const Wrapper = styled.div`
  width: 50%;
  border: 1px solid lightgreen;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  color: grey;
  overflow: hidden;
`;

const Image = styled.img`
  width: 25%;
  float: left;
  margin: 15px;
  margin-top: 10%;
`;

const ShowCard = props => (
  <Wrapper>
    <Image alt={`${props.CarTypeCode} Car poster`} src={`/public/img/${props.CarTypeCode}.png`} />
    <div>
      <h4 className="car-info">{carMetaData[props.CarTypeCode].CarTypeName}</h4>
      <h4 className="car-info">{carMetaData[props.CarTypeCode].PossibleModels}</h4>
      <h4 className="car-info">Daily rate: ${props.DailyRate}</h4>
      <h4 className="car-info">Total(without taxes) ${props.SubTotal}</h4>
      <h4><a href={props.DeepLink} target="_blank" className="book-link">Book this >></a></h4>
    </div>
  </Wrapper>
);

export default ShowCard;
