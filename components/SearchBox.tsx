import React from "react";
// import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import cities from 'cities.json';
import useStickyState from "../lib/useStickyCity";

export interface Cities {

}

export interface City {
  country: number;
  name: string;
  lat: number;
  lng: number;
  selected?: boolean;
}

const SearchBox = ({ placeholder, onCityClick } : {placeholder: string, onCityClick: () => void}) => {
  const [allSelectedCity, setAllSelectedCity] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities: City[] = [];

    if (value.length > 3) {
      for (let city of cities as City[]) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
          };

          matchingCities.push(cityData);
          continue;
        }
      }
    }

    return setResults(matchingCities);
  };

  const handleCityClick = (city: City) => {
    const allCoords = window.localStorage.getItem("coords");
    if (allCoords !== null) {
      setAllSelectedCity(JSON.parse(allCoords));
    }
    const updatedSelectedCityList: City[] = allSelectedCity.slice(0, 4).map((obj: City) => ({...obj, selected: false}));
    updatedSelectedCityList.unshift({ ...city , selected: true })
    window.localStorage.setItem("coords", JSON.stringify(updatedSelectedCityList));
    onCityClick();
    setQuery('');
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
      />

      {query.length > 3 && (
        <ListWrapper>
          {results.length > 0 ? (
            results.map((city: any, i) => {
              return (
                <ListItem key={i}>
                    <ListButton onClick={() => handleCityClick(city)}>
                      {city.name}
                      <span>({city.country})</span>
                    </ListButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem className="search__no-results">No results found</ListItem>
          )}
        </ListWrapper>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 15px;
  border-radius: 10px;
  border: 2px solid #4361ee;
  font-size: 1.25rem;
  color: $dark;
  font-family: "Nunito", sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListWrapper = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  padding: 5px 15px;
  margin: 0;
  list-style: none;
  border: 2px solid #4361ee;
  border-radius: 10px;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const ListButton = styled.button`
  display: block;
  text-decoration: none;
  color: #242424;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  padding: 10px 0;
  border-width: 0;
  background-color: transparent;

  &:hover {
    color: #4361ee;
  }
`;

export default SearchBox;
