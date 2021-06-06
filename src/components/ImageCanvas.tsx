import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { getImageData } from "../Noise/imageGenerator";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
};

const ImageCanvas = ({ canvasRef }: Props) => {
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
    resolution,
    useGradient,
  } = useGlobalContext();

  // Rerender when parameters change
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")!;

    let imageData: ImageData;

    // get the image data with or without gradient
    if (useGradient) {
      imageData = getImageData(
        resolution,
        noiseType,
        dimension,
        frequency,
        offsetX,
        offsetY,
        octaves,
        lacunarity,
        persistance,
        palette
      );
    } else {
      imageData = getImageData(
        resolution,
        noiseType,
        dimension,
        frequency,
        offsetX,
        offsetY,
        octaves,
        lacunarity,
        persistance
      );
    }

    ctx.putImageData(imageData, 0, 0);
  }, [
    canvasRef,
    noiseType,
    dimension,
    frequency,
    offsetX,
    offsetY,
    octaves,
    lacunarity,
    persistance,
    palette,
    resolution,
    useGradient,
  ]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={resolution} height={resolution}></canvas>
    </div>
  );
};

export default ImageCanvas;
