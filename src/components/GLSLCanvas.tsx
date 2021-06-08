import { useEffect, useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { Canvas } from "glsl-canvas-js";
import test from "../shaders/test.frag";

type Props = {
  isSidebarOpen: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
};

const GLSLCanvas = ({ isSidebarOpen, canvasRef }: Props) => {
  const [containerWidth, setContainerWidth] = useState("width: calc(100% - 5rem)");
  const [margin, setMargin] = useState("5rem");

  useEffect(() => {
    const options = {
      alpha: false,
      antialias: true,
      mode: "flat",
    };

    const glsl = new Canvas(canvasRef.current, options);

    console.log(glsl);
  }, []);
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
          <canvas ref={canvasRef} data-fragment-url={test} width="512" height="512"></canvas>
        </div>
      </MapInteractionCSS>
    </div>
  );
};

export default GLSLCanvas;
