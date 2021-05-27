import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getImageData,
  getUVImageData,
  NoiseType,
} from "./Noise/imageGenerator";
import { Vector2 } from "./Noise/mathUtils";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [canvasScale, setCanvasScale] = useState(1);
  const [noiseType, setNoiseType] = useState(NoiseType.Value);
  const [dimension, setDimension] = useState(1);
  const [frequecny, setFrequency] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);
    // clear canvas
    ctx.putImageData(
      new ImageData(canvasRef.current.width, canvasRef.current.height),
      0,
      0
    );
    const imageData = getImageData(
      canvasRef.current.width,
      canvasRef.current.height,
      noiseType,
      dimension,
      frequecny,
      offsetX,
      offsetY
    );
    console.log(canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);
    // clear canvas
    ctx.putImageData(
      new ImageData(canvasRef.current.width, canvasRef.current.height),
      0,
      0
    );
    const imageData = getImageData(
      canvasRef.current.width,
      canvasRef.current.height,
      noiseType,
      dimension,
      frequecny,
      offsetX,
      offsetY
    );
    console.log(canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(imageData, 0, 0);
  }, [noiseType, dimension, frequecny, offsetX, offsetY]);

  const handleNoiseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "value":
        setNoiseType(NoiseType.Value);
        console.log("set to value");
        break;
      case "perlin":
        setNoiseType(NoiseType.Perlin);
        console.log("set to perlin");
        break;

      default:
        throw new Error("Unknow noise type!");
    }
  };
  const handleDimensionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimension(parseInt(e.target.value));
  };
  const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFrequency = Math.max(0.001, parseFloat(e.target.value));
    setFrequency(newFrequency);
  };
  const handleOffsetXChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseFloat(e.target.value));
  };
  const handleOffsetYChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseFloat(e.target.value));
  };

  return (
    <div>
      <h1>Noise generator</h1>
      <canvas
        ref={canvasRef}
        width="512"
        height="512"
        style={{ transform: `scale(${canvasScale})` }}
      ></canvas>
      <br />
      <select
        name="noiseType"
        id="noiseType"
        onChange={(e) => handleNoiseTypeChange(e)}
      >
        <option value="value">Value</option>
        <option value="perlin">Perlin</option>
      </select>
      <select
        name="dimension"
        id="dimesnion"
        onChange={(e) => handleDimensionChange(e)}
      >
        <option value={1}>1D</option>
        <option value={2}>2D</option>
      </select>
      <div>
        <label htmlFor="frequency" style={{ color: "white" }}>
          Frequency
        </label>
        <input
          id="frequency"
          type="number"
          onChange={(e) => handleFrequencyChange(e)}
          value={frequecny}
        />
      </div>
      <div>
        <label htmlFor="offsetX" style={{ color: "white" }}>
          Offset X
        </label>
        <input
          id="offsetX"
          type="number"
          onChange={(e) => handleOffsetXChange(e)}
          value={offsetX}
        />
        <label htmlFor="offsetY" style={{ color: "white" }}>
          Offset Y
        </label>
        <input
          id="offsetY"
          type="number"
          onChange={(e) => handleOffsetYChange(e)}
          value={offsetY}
        />
      </div>
    </div>
  );
}

export default App;
