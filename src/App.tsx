import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WorldMap from "react-svg-worldmap";
import type { CountryContext } from "react-svg-worldmap";
import getCountryISO2 from "country-iso-3-to-2";
import Drawer from "./components/Drawer";
import Slider from "./components/Slider";
import Summary from "./components/Summary";
import "./App.scss";

import countryHappinessData from "./assets/country-happiness-data.json"; // TODO: remove this

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

  const handleClickCountry = useCallback(({ countryCode }: CountryContext) => {
    navigate(`/${countryCode}`);
  }, []);

  const navigate = useNavigate();

  function handleChangeYear(year: number | number[]) {
    setCurrentYear(year);
  }

  if (!countryData) {
    return "Loading...";
  }

  let min = 99;
  let max = 0;
  let total = 0;
  let count = 0;
  let happiestCountry = null;
  let saddestCountry = null;
  const currentYearData = [];

  countryData.forEach((yearlyData, countryCode) => {
    const happinessScoreForCurrentYear = yearlyData[currentYear];
    if (happinessScoreForCurrentYear) {
      currentYearData.push({ country: countryCode.toLowerCase(), value: happinessScoreForCurrentYear });
      total += happinessScoreForCurrentYear;
      count++;

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

  function getStyle({ countryValue }: CountryContext) {
    let fillColor;

    if (countryValue === undefined) {
      fillColor = "white";
    } else if (countryValue < 1) {
      fillColor = "#702222";
    } else if (countryValue < 2) {
      fillColor = "#af040d";
    } else if (countryValue < 3) {
      fillColor = "#d73210";
    } else if (countryValue < 4) {
      fillColor = "#f75c35";
    } else if (countryValue < 5) {
      fillColor = "#fc9841";
    } else if (countryValue < 6) {
      fillColor = "#fecb33";
    } else if (countryValue < 6.5) {
      fillColor = "#f7fc51";
    } else if (countryValue < 7) {
      fillColor = "#aef863";
    } else if (countryValue < 7.5) {
      fillColor = "#03a817";
    } else if (countryValue < 8) {
      fillColor = "#157302";
    } else if (countryValue < 9) {
      fillColor = "";
    } else if (countryValue < 10) {
      fillColor = "";
    }

    return {
      fill: fillColor,
      fillOpacity: 1,
      stroke: "black",
      strokeWidth: 1,
      strokeOpacity: 0.2,
      cursor: "pointer",
    };
  }

  return (
    <>
      <div>
        <h1>Happiness levels between 2011 and 2022</h1>
        <Slider handleChangeYear={handleChangeYear} years={years} />
        <Summary
          currentYear={currentYear}
          average={total / count}
          happiest={{ name: happiestCountry, score: max }}
          saddest={{ name: saddestCountry, score: min }}
        />
        <WorldMap
          color="green"
          size="responsive"
          onClickFunction={handleClickCountry}
          data={currentYearData}
          styleFunction={getStyle}
        />
      </div>

      <Routes>
        <Route path=":countryCode" element={<Drawer countryCodeMappings={countryCodeMappings.current} />} />
      </Routes>
    </>
  );
}

export default App;
