import { useEffect } from "preact/hooks";
import { StationType } from "@/interfaces/station.ts";
import { Stations } from "@/islands/StatioMain.tsx";
import { useSignal } from "@preact/signals";

export default function FavStations() {
  const stations = useSignal<StationType[]>([]);

  const updateFavStations = () => {
    const favStations = localStorage.getItem("favStations");
    if (favStations) stations.value = JSON.parse(favStations);
  };

  useEffect(() => {
    updateFavStations();
  });

  return (
    <div>
      {stations.value.length !== 0
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
