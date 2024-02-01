function getCountryData(countryCode, yearlyData) {
  let minScore = 99;
  let maxScore = 0;
  let minYear = null;
  let maxYear = null;
  const chartData = [];

  for (const [year, data] of yearlyData) {
    const score = data.get(countryCode);

    chartData.unshift({ name: year, score });

    if (score < minScore) {
      minScore = score;
      minYear = year;
    }

    if (score > maxScore) {
      maxScore = score;
      maxYear = year;
    }
  }

  return { minScore, maxScore, minYear, maxYear, chartData };
}

export { getCountryData };
