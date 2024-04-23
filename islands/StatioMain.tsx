import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { StationType } from "@/interfaces/station.ts";
import Stations, { apiUrl, HEADERS, sortByVotes } from "@/islands/Stations.tsx";

async function getStations(countryNameOrg?: string) {
  let countryName = countryNameOrg;
  if (countryName === undefined) {
    countryName = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split("/")[1];
  }
  const stations: StationType[] = await (
    await fetch(
      `${apiUrl}/bycountry/${countryName}`,
      {
        headers: HEADERS,
      },
    )
  ).json();
  return stations;
}

export default function StationMain(
  { title, country }: {
    title?: string;
    country?: string;
  },
) {
  const stations = useSignal<StationType[]>([]);
  useEffect(() => {
    getStations(country).then((newStations) => {
      stations.value = newStations.sort(sortByVotes);
    });
  }, []);
  return (
    <div>
      {stations.value !== null &&
        (
          <Stations
            title={title ? title : "Local Stations"}
            stations={stations}
          />
        )}
    </div>
  );
}
