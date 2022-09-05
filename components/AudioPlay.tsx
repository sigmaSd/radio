/** @jsx h */
import { h } from "preact";

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
