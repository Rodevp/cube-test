import { useState } from "react";

import Canvas from "./canvas";
import ControlPanel from "./control-panel";

import { Face, CubeProps } from "../types";

const Cube: React.FC<CubeProps> = ({ width, height }) => {

  const [faces, setFaces] = useState<Face[]>([
    { color: "red", vertices: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] }, 
    { color: "green", vertices: [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]] }, 
    { color: "blue", vertices: [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]] }, 
    { color: "yellow", vertices: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] }, 
    { color: "cyan", vertices: [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]] }, 
    { color: "magenta", vertices: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] }, 
  ]);

  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const changeColors = () => {
    setFaces(faces.map(face => ({ ...face, color: randomColor() })));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        justifyContent: "center",
      }}
    >
      <Canvas width={width} height={height} faces={faces} />
      <ControlPanel onChangeColors={changeColors} />
    </div>
  );
};

export default Cube;
