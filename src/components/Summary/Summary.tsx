// import "./Summary.scss";

interface IDetails {
  name: string | null;
  score: number;
}

interface ISummary {
  currentYear: number | null;
  happiest: IDetails;
  saddest: IDetails;
}

function Summary({ currentYear, happiest, saddest }: ISummary) {
  return (
    <>
      <br />
      <br />
      {currentYear}
      <br />
      Happiest Country: {happiest.name} ({happiest.score})<br />
      Least happy Country: {saddest.name} ({saddest.score})<br />
    </>
  );
}

export default Summary;
