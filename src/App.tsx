import { useRef } from "react";
import GradientCreator from "./components/GradientCreator";
import Sidebar from "./components/Sidebar";
import ImageCanvas from "./components/ImageCanvas";
import { useGlobalContext } from "./context";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const { useGradient } = useGlobalContext();

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

      <ImageCanvas canvasRef={canvasRef} />

      <br />
      {useGradient && <GradientCreator />}
    </div>
  );
}

export default App;
