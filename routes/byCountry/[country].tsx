import type { PageProps } from "$fresh/src/server/types.ts";
import StationMain from "@/islands/StatioMain.tsx";

export default function Page(props: PageProps) {
  let country = decodeURIComponent(props.params.country); // handle things like "United%20Kingdom"
  if (country.toLowerCase() === "is" + "rael") country = "palestine";
  if (country === "Palestinian Territories") country = "palestine";

  return (
    // the div is important!
    // if we just return <StationMain...> it will be the same as index.tsx route
    // this will make fresh partial not rerender the stations when going country -> index
    // the div breaks that similarity
    <>
      <div>
        <StationMain title={country} country={country} />;
      </div>
    </>
  );
}
