import RMDrawer from "react-modern-drawer";
import { useNavigate, useParams } from "react-router-dom";
import "react-modern-drawer/dist/index.css";
import "./Drawer.scss";

function Drawer({ countryCodeMappings }) {
  const navigate = useNavigate();
  const params = useParams();

  const countryFullName = countryCodeMappings.get(params.countryCode);
  const title = countryFullName ? `Happiness in ${countryFullName}` : "Unknown country";

  // TODO: typescript
  // TODO: wider
  // TODO: close button
  // TODO: show all their ratings in a graph
  // TODO: show their global rankings?

  return (
    <RMDrawer
      className="drawer"
      open
      onClose={() => {
        navigate("/");
      }}
      direction="right"
    >
      <header>{title}</header>
      <img src={`https://flagsapi.com/${params.countryCode}/flat/64.png`} />
      <br />
      Close button
      <br />
      Best global ranking: ?<br />
      Worst global ranking: ?<br />
      Graph of all results?
      <p>Click away to close.</p>
    </RMDrawer>
  );
}

export default Drawer;
