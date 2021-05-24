import React, { useEffect, useRef, useState } from "react";
import { simpleNoise2D } from "./Noise/noise";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [canvasScale, setCanvasScale] = useState(1);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;
    setCanvasScale(512 / canvasRef.current.width);
    // clear canvas
    ctx.putImageData(
      new ImageData(canvasRef.current.width, canvasRef.current.height),
      0,
      0
    );
    const imageData = simpleNoise2D(
      canvasRef.current.width,
      canvasRef.current.height
    );
    console.log(canvasRef.current.width, canvasRef.current.height);

    ctx.putImageData(imageData, 0, 0);

    console.log(imageData);
  }, []);

  return (
    <div>
      <h1>Noise generator</h1>
      <canvas
        ref={canvasRef}
        width="512"
        height="512"
        style={{ transform: `scale(${canvasScale})` }}
      ></canvas>
    </div>
  );
}

export default App;
