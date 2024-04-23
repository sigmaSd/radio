import { useEffect } from "preact/hooks";
import type { StationType } from "@/interfaces/station.ts";
import Stations from "@/islands/Stations.tsx";
import { useSignal } from "@preact/signals";

///FIXME: for somereason the active station doesn't get highlighted
export default function FavStations() {
  const stations = useSignal<StationType[]>([]);

  useEffect(() => {
    const favStations = localStorage.getItem("favStations");
    if (favStations) stations.value = JSON.parse(favStations);
  });

  return (
    <div>
      {stations.value.length !== 0
        ? (
          <Stations
            title="Favourite Stations"
            stations={stations}
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
