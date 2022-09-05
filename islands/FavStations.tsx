/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { StationType } from "../interfaces/station.ts";
import { Stations } from "./StatioMain.tsx";

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
      {stations.length !== 0
        ? (
          <Stations
            title="Favourite Stations"
            stations={stations}
            updateFavStations={updateFavStations}
          />
        )
        : (
          <div>
            <h1>No Favourite Stations</h1>
            <p>
              You can add favourite stations by clicking on the star icon on any
              station.
            </p>
          </div>
        )}
    </div>
  );
}
