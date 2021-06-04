import { useEffect, useRef, useState } from "react";
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
import { useGlobalContext } from "./context";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [canvasScale, setCanvasScale] = useState(1);

  // Get values from context
  const {
    noiseType,
    dimension,
    frequency,
    offsetX,
    offsetY,
    octaves,
    lacunarity,
    persistance,
    palette,
  } = useGlobalContext();

  // Rerender when parameters change
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);

    const imageData = getImageData(
      canvasRef.current.width,
      canvasRef.current.height,
      noiseType,
      dimension,
      frequency,
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
    frequency,
    offsetX,
    offsetY,
    octaves,
    lacunarity,
    persistance,
    palette,
  ]);

  // downloads current noise texture as .png
  const downloadImage = () => {
    const img = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "noise-texture.png";
    link.href = img;
    link.click();
  };

  return (
    <div>
      <Sidebar downloadImage={downloadImage} />

      <br />
      {/* TODO: Make canvas component */}
      <div className="canvas-container">
        <canvas ref={canvasRef} width="512" height="512"></canvas>
      </div>

      <br />

      <GradientCreator />
    </div>
  );
}

export default App;
