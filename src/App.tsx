import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ImageCanvas from "./components/ImageCanvas";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} downloadImage={downloadImage} />

      <ImageCanvas canvasRef={canvasRef} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default App;
