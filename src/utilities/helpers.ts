import type { CountryContext } from "react-svg-worldmap";
import getCountryISO2 from "country-iso-3-to-2";

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
