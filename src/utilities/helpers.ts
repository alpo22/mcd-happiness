import type { CountryContext } from "react-svg-worldmap";
import getCountryISO2 from "country-iso-3-to-2";

function getStyle({ countryValue }: CountryContext) {
  let fillColor = "white";
  const colourMappings = [
    { max: 10, color: "#157302" },
    { max: 9, color: "#157302" },
    { max: 8, color: "#157302" },
    { max: 7.5, color: "#03a817" },
    { max: 7, color: "#aef863" },
    { max: 6.5, color: "#f7fc51" },
    { max: 6, color: "#fecb33" },
    { max: 5, color: "#fc9841" },
    { max: 4, color: "#f75c35" },
    { max: 3, color: "#d73210" },
    { max: 2, color: "#af040d" },
    { max: 1, color: "#702222" },
  ];

  if (countryValue !== undefined) {
    for (const { max, color } of colourMappings) {
      if (countryValue > max) {
        fillColor = color;
        break;
      }
    }
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

function getYearsData(countryCodeMappings: any, currentYear: number, yearlyData: any) {
  const min = Array.from(yearlyData.get(currentYear).values()).pop();
  const minCountry = Array.from(yearlyData.get(currentYear).keys()).pop();
  const max = Array.from(yearlyData.get(currentYear).values())[0];
  const maxCountry = Array.from(yearlyData.get(currentYear).keys())[0];
  let sum = 0;
  const count = yearlyData.get(currentYear).size;
  const formattedActiveYearData = [];

  for (const [countryCode, score] of yearlyData.get(currentYear)) {
    formattedActiveYearData.push({ country: countryCode.toLowerCase(), value: score });
    sum += score;
  }

  return {
    min,
    max,
    average: sum / count,
    minCountry: countryCodeMappings.current.get(minCountry),
    maxCountry: countryCodeMappings.current.get(maxCountry),
    formattedActiveYearData,
  };
}

function getFormattedData(countryCodeMappings: any, data: any) {
  const formattedData = new Map();

  // parse the data
  data.forEach((datum: any) => {
    const countryCode = getCountryISO2(datum.code);

    if (countryCode) {
      countryCodeMappings.current.set(countryCode, datum.country);

      if (formattedData.has(datum.year)) {
        // add a new country to an existing year
        const newData = {
          ...formattedData.get(datum.year),
          [countryCode]: datum.score,
        };

        formattedData.set(datum.year, newData);
      } else {
        // add a new year and the first country
        formattedData.set(datum.year, { [countryCode]: datum.score });
      }
    }
  });

  // sort the data by year ASC
  const dataSortedByYear = new Map([...formattedData.entries()].sort());

  // sort each year's data by score DESC
  [...dataSortedByYear.entries()].map(([year, data]) => {
    const objectsSortedByScore = new Map(Object.entries(data).sort((a: any, b: any) => b[1] - a[1]));

    formattedData.set(year, objectsSortedByScore);
  });

  const uniqueYears = Array.from(dataSortedByYear.keys());

  return { formattedData, uniqueYears };
}

export { getFormattedData, getStyle, getYearsData };
