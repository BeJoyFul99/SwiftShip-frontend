import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const MapComponent = ({ className }: React.ComponentProps<"div">) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className={className}>
      <TileLayer
        url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_LEAFLET_MAP_TOKEN}`}
        attribution='&copy; <a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
      />
      n
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
