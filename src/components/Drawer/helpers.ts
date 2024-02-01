function getCountryData(countryCode: string, yearlyData: any ) {
  let bestPosition = 999;
  let bestPositionYear = null;
  let worstPosition = 0;
  let worstPositionYear = null;

  const chartData = [];

  for (const [year, data] of yearlyData) {
    const score = data.get(countryCode);
    const positionThisYear = Array.from(data).findIndex(([_countryCode, ]: any) => _countryCode === countryCode) + 1;

    chartData.unshift({ name: year, score });

    if (positionThisYear > 0) {
      if (positionThisYear < bestPosition) {
        bestPosition = positionThisYear;
        bestPositionYear = year;
      }

      if (positionThisYear > worstPosition) {
        worstPosition = positionThisYear;
        worstPositionYear = year;
      }
    }
  }

  return { bestPosition, bestPositionYear, worstPosition, worstPositionYear, chartData };
}

export { getCountryData };
