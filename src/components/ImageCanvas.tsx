import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { getImageData } from "../Noise/imageGenerator";
import { MapInteractionCSS } from "react-map-interaction";

type Props = {
  isSidebarOpen: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
};

const ImageCanvas = ({ canvasRef, isSidebarOpen }: Props) => {
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

  const [containerWidth, setContainerWidth] = useState("width: calc(100% - 5rem)");
  const [margin, setMargin] = useState("5rem");
  useEffect(() => {
    if (isSidebarOpen) {
      setContainerWidth("calc(100% - 18rem)");
      setMargin("18rem");
    } else {
      setContainerWidth("calc(100% - 5rem)");
      setMargin("5rem");
    }
  }, [isSidebarOpen]);

  return (
    <div className="map-container" style={{ width: containerWidth, marginLeft: margin }}>
      <MapInteractionCSS minScale={0.05} maxScale={10}>
        <div className="canvas-container">
          <canvas ref={canvasRef} width={resolution} height={resolution}></canvas>
        </div>
      </MapInteractionCSS>
    </div>
  );
};

export default ImageCanvas;
