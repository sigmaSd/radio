/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";
import { Stations, StationType } from "./StatioMain.tsx";

export default function FavStations() {
  const [stations, setStations] = useState<StationType[]>([]);
  const updateFavStations = () => {
    const favStations = localStorage.getItem("favStations");
    if (favStations) {
      setStations(JSON.parse(favStations));
    }
  };
  useEffect(() => {
    updateFavStations();
  });

  return (
    <div>
      {stations.length !== 0 &&
        (
          <Stations
            title="Favourite Stations"
            stations={stations}
            updateFavStations={updateFavStations}
          />
        )}
    </div>
  );
}
