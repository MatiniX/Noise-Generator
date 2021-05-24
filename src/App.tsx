import React, { useEffect, useRef } from "react";
import "./App.css";
import { simpleNoise2D } from "./Noise/noise";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    const imageData = simpleNoise2D(
      canvasRef.current.width,
      canvasRef.current.height
    );

    ctx.putImageData(imageData, 0, 0);

    console.log(imageData);
  }, []);

  return (
    <div>
      <h1>Noise generator</h1>
      <canvas ref={canvasRef} width="512" height="512"></canvas>
    </div>
  );
}

export default App;
