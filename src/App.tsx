import { ChangeEvent, useEffect, useRef, useState } from "react";
import InteractiveInput from "./components/InteractiveInput";
import {
  evaluateGradient,
  getImageData,
  getUVImageData,
  getWorleyNoiseImageData,
  NoiseType,
} from "./Noise/imageGenerator";
import { Vector2, random2, Color } from "./Noise/mathUtils";
import GradientCreator from "./GradientCreator";
import Sidebar from "./components/Sidebar";
import Select from "react-select";

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
  const [palette, setPalette] = useState([
    { offset: "0.00", color: "rgb(0, 0, 0)" },
    { offset: "1.00", color: "rgb(255, 255, 255)" },
  ]);

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

    ctx.putImageData(imageData, 0, 0);
  }, [
    noiseType,
    dimension,
    frequecny,
    offsetX,
    offsetY,
    octaves,
    lacunarity,
    persistance,
    palette,
  ]);

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
  const downloadImage = () => {
    const img = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "noise-texture.png";
    link.href = img;
    link.click();
  };

  return (
    <div>
      <Sidebar
        handleNoiseTypeChange={handleNoiseTypeChange}
        handleDimensionChange={handleDimensionChange}
        setFrequency={setFrequency}
        setOffsetX={setOffsetX}
        setOffsetY={setOffsetY}
        octaves={octaves}
        setOctaves={setOctaves}
        lacunarity={lacunarity}
        setLacunarity={setLacunarity}
        persistance={persistance}
        setPersistance={setPersistance}
        palette={palette}
        setPalette={setPalette}
      />
      <br />
      <div className="canvas-container">
        <canvas ref={canvasRef} width="512" height="512"></canvas>
      </div>

      <br />

      <button onClick={downloadImage}>Download</button>
      <GradientCreator palette={palette} setPalette={setPalette} />
    </div>
  );
}

export default App;
