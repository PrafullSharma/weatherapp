import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchBox from '../components/SearchBox'
import SelectedCityList from '../components/SelectedCityList'
import TodaysWeather from '../components/TodaysWeather'

const Home: NextPage = () => {
  const [weatherToday, setWeatherToday] = useState();
  const [selCity, setSelCity] = useState([{
    country: "PT",
    name: "Lisbon",
    lat: "38.7259284",
    lng: "-9.13738217"
  }])

  useEffect(() => {
    const allCoords = window.localStorage.getItem("coords");
    if (allCoords !== null) {
      setSelCity(JSON.parse(allCoords));
    }
  }, [])

  const getData = async () => {
    const {lat, lng, name} = selCity[0];
    console.log('selCity[0]-------', name, lat, lng)
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=694610cb98c9c1942f4ea9515dc83781`
    );
    const data = await res.json();
    setWeatherToday(data)
    console.log('data-------', data)
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [selCity])

  const handleCitySelect = () => {
    if (typeof window !== "undefined") {
      const allCoords = window.localStorage.getItem("coords");
      if (allCoords !== null) {
        setSelCity(JSON.parse(allCoords));
      }
    }
  }
 
  return (
    <div>
      <Head>My Weather App</Head>
      <Wrapper>
        <Container>
          <SelectedCityList data={selCity} />
          <SearchBox placeholder="Search for a city..." onCityClick={handleCitySelect} />
          {weatherToday && <TodaysWeather weatherData={weatherToday} />}
        </Container>
      </Wrapper>
      
    </div>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
`;

export default Home
