import React from "react"
import styled from "styled-components";

const SelectedCityList = ({data}) => {
 return (
  <ListWrapper>
    {data.map((elm, i) => {
      return (
        <ListItem key={i}>{elm.name} - {elm.lat} - {elm.lng}</ListItem>
      )}
    )}
  </ListWrapper>
 )
}

const ListWrapper = styled.ul`
  padding: 10px 0;
  display: block;
  text-align: center;
  margin: 0;
  list-style: none;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.li`
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  margin: 5px;
  border: 2px solid #4361ee;
  border-radius: 10px;
`;

export default SelectedCityList;