import { useCallback, useEffect, useRef, useState } from "react";
import WorldMap from "react-svg-worldmap";
import type { CountryContext } from "react-svg-worldmap";
import Slider from "./components/Slider";
import Summary from "./components/Summary";
import getCountryISO2 from "country-iso-3-to-2";
import "./App.scss";

import countryHappinessData from "./assets/country-happiness-data.json"; // TODO: remove this

/*
TODO: click on a country:
  - changes url
  - drills into its data (maybe a sidepanel, or a takeover)
  - handle invalid url
TODO: fix all the typescript errors
TODO: it is gettind data locally. use api. put it somewhere where it wont complain about too many requests.
TODO: make it look a little nicer
TODO: fancier loading state
TODO: deploy it somewhere

- caching, optimizing (am i using proper react hooks?)



decisions:
  map vs set vs object vs array
  some years are missing for some countries

  what do when click on a country (sidepanel vs takeover vs new page)

  what to put in url (country, year)
*/

function App() {
  const [countryData, setCountryData] = useState(null);
  const [years, setYears] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const countryCodeMappings = useRef(new Map()); // { 2-char code, fullname}

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch("https://filebin.net/9y0b0dmcr6mkyh35/country-happiness-data.json");
      // const data = await response.json();
      const data = countryHappinessData;

      const formattedData = new Map();
      const uniqueYears = new Set();

      data.forEach((datum) => {
        uniqueYears.add(datum.year);
        const countryCode = getCountryISO2(datum.code);
        countryCodeMappings.current.set(countryCode, datum.country);

        if (countryCode) {
          if (formattedData.has(countryCode)) {
            const newData = {
              ...formattedData.get(countryCode),
              [datum.year]: datum.score,
            };

            formattedData.set(countryCode, newData);
          } else {
            formattedData.set(countryCode, { [datum.year]: datum.score });
          }
        }
      });

      setCountryData(formattedData);

      const sortedYears = Array.from(uniqueYears).sort();
      setYears(sortedYears);
      setCurrentYear(sortedYears[sortedYears.length - 1]);
    }

    fetchData();
  }, []);

  const handleClickCountry = useCallback(({ countryName, countryCode, countryValue }: CountryContext) => {
    console.log("clicked", countryName, countryCode, countryValue);
  }, []);

  function handleChangeYear(year: number | number[]) {
    setCurrentYear(year);
  }

  if (!countryData) {
    return "Loading...";
  }

  let min = 99;
  let max = 0;
  let happiestCountry = null;
  let saddestCountry = null;
  const currentYearData = [];

  countryData.forEach((yearlyData, countryCode) => {
    const happinessScoreForCurrentYear = yearlyData[currentYear];
    if (happinessScoreForCurrentYear) {
      currentYearData.push({ country: countryCode.toLowerCase(), value: happinessScoreForCurrentYear });

      if (happinessScoreForCurrentYear > max) {
        max = happinessScoreForCurrentYear;
        happiestCountry = countryCodeMappings.current.get(countryCode);
      }
      if (happinessScoreForCurrentYear < min) {
        min = happinessScoreForCurrentYear;
        saddestCountry = countryCodeMappings.current.get(countryCode);
      }
    }
  });

  return (
    <div>
      <h1>Happiness levels between 2011 and 2022</h1>
      <Slider handleChangeYear={handleChangeYear} years={years} />
      <Summary
        currentYear={currentYear}
        happiest={{ name: happiestCountry, score: max }}
        saddest={{ name: saddestCountry, score: min }}
      />
      <WorldMap color="green" size="responsive" onClickFunction={handleClickCountry} data={currentYearData} />
    </div>
  );
}

export default App;
