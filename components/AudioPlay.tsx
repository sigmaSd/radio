import { StationType } from "../interfaces/station.ts";

export default function AudioPlay() {
  const imgStyle = {
    width: "150px",
    height: "150px",
    fontSize: "20px",
    fontWeight: "bold",
    background: "rgb(204, 204, 204)",
    border: "4px solid #fa4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: "5px",
  };
  const divStyle = {
    display: "none",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div id="audioDiv" style={divStyle}>
      <img id="audioImg" style={imgStyle} />
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
