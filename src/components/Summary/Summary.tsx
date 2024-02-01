// import "./Summary.scss";

interface IDetails {
  name: string | null;
  score: number;
}

interface ISummary {
  average: number;
  currentYear: number | null;
  happiest: IDetails;
  saddest: IDetails;
}

function Summary({ average, currentYear, happiest, saddest }: ISummary) {
  return (
    <>
      <br />
      <br />
      {currentYear}
      <br />
      Happiest Country: {happiest.name} ({happiest.score.toFixed(3)})<br />
      Least happy Country: {saddest.name} ({saddest.score.toFixed(3)})<br />
      Global average: {average.toFixed(3)}
    </>
  );
}

export default Summary;
