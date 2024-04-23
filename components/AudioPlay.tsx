import type { StationType } from "@/interfaces/station.ts";

export default function AudioPlay() {
  return (
    <div
      id="audioDiv"
      class="hidden flex-wrap flex-row justify-center items-center"
    >
      <img
        alt="Radio logo"
        id="audioImg"
        class="w-40 h-40 text-xl font-bold bg-gray-400 border-4 border-yellow-400 flex items-center justify-evenly mr-5"
      />
      {/*TODO: maybe add captions for stations that have it*/}
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio id="audio" controls />
    </div>
  );
}

AudioPlay.playStation = async (station: StationType) => {
  const getSrc = async (station: string) => {
    const url = new URL(station);
    const isSpecialType = url.pathname.endsWith(".pls") ||
      url.pathname.endsWith(".m3u") || url.pathname.endsWith(".asx");
    if (isSpecialType) {
      return await fetch("/api/handlesrc", {
        method: "POST",
        body: station,
      }).then((res) => res.text());
    }
    return station;
  };

  const audioDiv = document.getElementById("audioDiv") as HTMLDivElement;
  audioDiv.style.display = "flex";

  const audioImg = document.getElementById("audioImg") as HTMLImageElement;
  if (station.favicon !== "") {
    audioImg.alt = "";
    audioImg.src = station.favicon;
  } else {
    audioImg.src = "";
    audioImg.alt = station.name;
  }

  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.setAttribute("controls", "");
  audio.src = await getSrc(station.url);
  audio.play();
};
