import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/app/context/ThemeContext";
const MapComponent = ({ className }: React.ComponentProps<"div">) => {
  const { theme } = useTheme();
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className={className}>
      <TileLayer
        url={`https://tile.jawg.io/${
          theme === "dark" ? "jawg-dark" : "light"
        }/{z}/{x}/{y}{r}.png?access-token=${
          process.env.NEXT_PUBLIC_LEAFLET_MAP_TOKEN
        }`}
        attribution='&copy; <a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;
