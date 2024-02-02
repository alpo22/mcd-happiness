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
    <table cellPadding={5} align="center">
      <tbody>
        <tr>
          <th></th>
          <th>Year</th>
          <th>Country</th>
          <th>Score</th>
        </tr>
        <tr>
          <th>Highest</th>
          <td>{currentYear}</td>
          <td>{happiest.name}</td>
          <td>{happiest.score.toFixed(3)}</td>
        </tr>
        <tr>
          <th>Lowest</th>
          <td>{currentYear}</td>
          <td>{saddest.name}</td>
          <td>{saddest.score.toFixed(3)}</td>
        </tr>
        <tr>
          <th>Average</th>
          <td>{currentYear}</td>
          <td></td>
          <td>{average.toFixed(3)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Summary;
