import { Drawer as AntDrawer } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./Drawer.scss";

interface IDrawer {
  countryCodeMappings: Map<string, string>;
}

function Drawer({ countryCodeMappings }: IDrawer) {
  const navigate = useNavigate();
  const params = useParams();

  const countryFullName = countryCodeMappings.get(params.countryCode!);
  const title = countryFullName ? `Happiness in ${countryFullName}` : "Unknown country";

  // TODO: show all their ratings in a graph

  return (
    <AntDrawer
      open
      onClose={() => {
        navigate("/");
      }}
      title={title}
    >
      <img src={`https://flagsapi.com/${params.countryCode}/flat/64.png`} />
      <br />
      Best global ranking: ?<br />
      Worst global ranking: ?<br />
      Graph of all results?
    </AntDrawer>
  );
}

export default Drawer;
