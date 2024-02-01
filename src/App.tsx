import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import WorldMap from "react-svg-worldmap";
import type { CountryContext } from "react-svg-worldmap";
import Drawer from "./components/Drawer";
import Slider from "./components/Slider";
import Summary from "./components/Summary";
import { getFormattedData, getStyle, getYearsData } from "./utilities/helpers";
import "./App.scss";

import countryHappinessData from "./assets/country-happiness-data.json"; // TODO: remove this

function App() {
  const [yearlyData, setYearlyData] = useState<any | null>(null);
  const [years, setYears] = useState<number[] | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const countryCodeMappings = useRef(new Map()); // { 2-char code, fullname}
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch("https://filebin.net/9y0b0dmcr6mkyh35/country-happiness-data.json");
      // const rawData = await response.json();
      const rawData = countryHappinessData;

      const { formattedData, uniqueYears } = getFormattedData(countryCodeMappings, rawData);

      setYears(uniqueYears);
      setCurrentYear(uniqueYears[uniqueYears.length - 1]);
      setYearlyData(formattedData);
    }

    fetchData();
  }, []);

  const handleClickCountry = useCallback(({ countryCode }: CountryContext) => {
    navigate(`/${countryCode}`);
  }, []);

  function handleChangeYear(year: any) {
    setCurrentYear(year);
  }

  if (!yearlyData) {
    return "Loading...";
  }

  const { min, max, average, minCountry, maxCountry, formattedActiveYearData }: any = getYearsData(
    countryCodeMappings,
    currentYear!,
    yearlyData
  );

  // eslint-disable-next-line
  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="app-wrapper">
            <h1>Self-reported life satisfaction</h1>
            <p>Move the slider to change years, or click on a country to drill down.</p>
            <Slider handleChangeYear={handleChangeYear} years={years} />
            <Summary
              currentYear={currentYear}
              average={average}
              happiest={{ name: maxCountry, score: max }}
              saddest={{ name: minCountry, score: min }}
            />
            <WorldMap
              color="green"
              size="responsive"
              onClickFunction={handleClickCountry}
              data={formattedActiveYearData}
              styleFunction={getStyle}
            />
            <Outlet />
          </div>
        }
      >
        <Route
          path=":countryCode"
          element={<Drawer countryCodeMappings={countryCodeMappings.current} yearlyData={yearlyData} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
