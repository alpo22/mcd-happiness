import { Drawer as AntDrawer } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getCountryData } from "./helpers";
import "./Drawer.scss";

interface IDrawer {
  countryCodeMappings: Map<string, string>;
  yearlyData: Map<string, string>;
}

function Drawer({ countryCodeMappings, yearlyData }: IDrawer) {
  const navigate = useNavigate();
  const params = useParams();
  const countryCode = params.countryCode!;

  const { bestPosition, bestPositionYear, worstPosition, worstPositionYear, chartData } = getCountryData(
    countryCode,
    yearlyData
  );

  const countryFullName = countryCodeMappings.get(countryCode);
  const countryFound = !!countryFullName;

  const title = countryFound ? (
    <>
      Happiness in {countryFullName} <img src={`https://flagsapi.com/${countryCode}/flat/24.png`} />
    </>
  ) : (
    "Country not found :("
  );

  return (
    <AntDrawer
      className="drawer"
      open
      onClose={() => {
        navigate("/");
      }}
      width={600}
      title={title}
    >
      {countryFound && (
        <>
          <table cellPadding={5} align="center">
            <tr>
              <th></th>
              <th>Position</th>
              <th>Year</th>
            </tr>
            <tr>
              <th>Best</th>
              <td>{bestPosition}</td>
              <td>{bestPositionYear}</td>
            </tr>
            <tr>
              <th>Worst</th>
              <td>{worstPosition}</td>
              <td>{worstPositionYear}</td>
            </tr>
          </table>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#30a1d1" />
          </LineChart>
        </>
      )}
    </AntDrawer>
  );
}

export default Drawer;
