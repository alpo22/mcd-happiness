import { useEffect, useRef, useState } from "react";
import { getFormattedData } from "./helpers";
import rawCountryHappinessData from "../assets/country-happiness-data.json";

export default function useCountryData() {
  const [yearlyData, setYearlyData] = useState<any | null>(null);
  const [years, setYears] = useState<number[] | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const countryCodeMappings = useRef(new Map()); // { 2-char code, fullname}

  useEffect(() => {
    const { formattedData, uniqueYears } = getFormattedData(countryCodeMappings, rawCountryHappinessData);

    setYearlyData(formattedData);
    setYears(uniqueYears);
    setCurrentYear(uniqueYears[uniqueYears.length - 1]);
  }, []);

  return { countryCodeMappings, years, currentYear, setCurrentYear, yearlyData };
}
