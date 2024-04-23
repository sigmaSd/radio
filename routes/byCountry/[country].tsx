import type { PageProps } from "$fresh/src/server/types.ts";
import StationMain from "@/islands/StatioMain.tsx";
import { Partial } from "$fresh/runtime.ts";

export default function Page(props: PageProps) {
  const country = decodeURIComponent(props.params.country); // handle things like "United%20Kingdom"

  // We add partial here, because this page is reched from map.js
  // it changes the windows location directly so fresh is not aware of it
  // and so it won't be wrapped with _app.tsx
  return (
    <Partial name="country">
      <StationMain title={country} country={country} />
    </Partial>
  );
}
