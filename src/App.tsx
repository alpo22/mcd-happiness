import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import WorldMap from "react-svg-worldmap";
import type { CountryContext } from "react-svg-worldmap";
import Drawer from "./components/Drawer";
import Slider from "./components/Slider";
import Summary from "./components/Summary";
import useCountryData from "./utilities/useCountryData";
import { getStyle, getYearsData } from "./utilities/helpers";
import "./App.scss";

function App() {
  const { countryCodeMappings, years, currentYear, setCurrentYear, yearlyData } = useCountryData();
  const navigate = useNavigate();

  function handleClickCountry({ countryCode }: CountryContext) {
    navigate(`/${countryCode}`);
  }

  function handleChangeYear(year: any) {
    setCurrentYear(year);
  }

  if (!yearlyData || !currentYear) {
    return "Loading...";
  }

  const { min, max, average, minCountry, maxCountry, formattedActiveYearData }: any = getYearsData(
    countryCodeMappings,
    currentYear,
    yearlyData
  );

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
