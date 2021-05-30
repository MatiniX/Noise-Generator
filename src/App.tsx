import { markTimeline } from "console";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import InteractiveInput from "./components/InteractiveInput";
import {
  getImageData,
  getUVImageData,
  getWorleyNoiseImageData,
  NoiseType,
} from "./Noise/imageGenerator";
import { Vector2, random2 } from "./Noise/mathUtils";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [canvasScale, setCanvasScale] = useState(1);
  const [noiseType, setNoiseType] = useState(NoiseType.Value);
  const [dimension, setDimension] = useState(1);
  const [frequecny, setFrequency] = useState(4);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [octaves, setOctaves] = useState(1);
  const [lacunarity, setLacunarity] = useState(2.0);
  const [persistance, setPersistance] = useState(0.5);

  // Default setup
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);
    // set default values
    ctx.putImageData(new ImageData(canvasRef.current.width, canvasRef.current.height), 0, 0);
    const imageData = getImageData(
      canvasRef.current.width,
      canvasRef.current.height,
      NoiseType.Value,
      1,
      1,
      0,
      0,
      1,
      2,
      0.5
    );

    const worley = getWorleyNoiseImageData(canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(worley, 0, 0);
  }, []);

  // Rerender when parameters change
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);

    const imageData = getImageData(
      canvasRef.current.width,
      canvasRef.current.height,
      noiseType,
      dimension,
      frequecny,
      offsetX,
      offsetY,
      octaves,
      lacunarity,
      persistance
    );
    console.log(canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(imageData, 0, 0);
  }, [noiseType, dimension, frequecny, offsetX, offsetY, octaves, lacunarity, persistance]);

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
      case "simplex":
        setNoiseType(NoiseType.Simplex);
        console.log("set to simplex");
        break;
      case "worley":
        setNoiseType(NoiseType.Worley);
        console.log("set to worley");
        break;

      default:
        throw new Error("Unknow noise type!");
    }
  };
  const handleDimensionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDimension(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>Noise generator</h1>
      <div className="canvas-container">
        <canvas ref={canvasRef} width="512" height="512"></canvas>
      </div>

      <br />
      <select name="noiseType" id="noiseType" onChange={(e) => handleNoiseTypeChange(e)}>
        <option value="value">Value</option>
        <option value="perlin">Perlin</option>
        <option value="simplex">Simplex</option>
        <option value="worley">Worley</option>
      </select>
      <select name="dimension" id="dimesnion" onChange={(e) => handleDimensionChange(e)}>
        <option value={1}>1D</option>
        <option value={2}>2D</option>
      </select>
      <div>
        <InteractiveInput
          label="Frequency"
          id="frequency"
          defaultValue={4}
          setParameter={setFrequency}
        />
      </div>
      <div>
        <InteractiveInput
          label="Offset X"
          id="ofssetX"
          defaultValue={0}
          setParameter={setOffsetX}
        />
        {dimension > 1 && (
          <InteractiveInput
            label="Offset Y"
            id="offsetY"
            defaultValue={0}
            setParameter={setOffsetY}
          />
        )}
      </div>
      <div>
        <label htmlFor="octaves">Octaves</label>
        <input
          type="range"
          min={1}
          max={8}
          value={octaves}
          onChange={(e) => setOctaves(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="lacunarity">Lacunarity</label>
        <input
          type="range"
          min={1.0}
          max={4.0}
          step="0.01"
          value={lacunarity}
          onChange={(e) => setLacunarity(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="persistance">Persistance</label>
        <input
          type="range"
          min={0.0}
          max={1.0}
          step="0.001"
          value={persistance}
          onChange={(e) => setPersistance(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default App;
