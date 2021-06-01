import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { HiChevronDoubleRight } from "react-icons/hi";
import NoiseTypeSettings from "./NoiseTypeSettings";
import OffsetAndScaleSettings from "./OffsetAndScaleSettings";
import FractalSettings from "./FractalSettings";

type Props = {
  handleNoiseTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDimensionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setFrequency: (n: number) => void;
  setOffsetX: (n: number) => void;
  setOffsetY: (n: number) => void;
  octaves: number;
  setOctaves: (n: number) => void;
  lacunarity: number;
  setLacunarity: (n: number) => void;
  persistance: number;
  setPersistance: (n: number) => void;
};

const Sidebar = ({
  handleNoiseTypeChange,
  handleDimensionChange,
  setFrequency,
  setOffsetX,
  setOffsetY,
  octaves,
  setOctaves,
  lacunarity,
  setLacunarity,
  persistance,
  setPersistance,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const collapse = (content: HTMLDivElement) => {
    if (content.style.maxHeight) {
      // @ts-ignore
      content.style.maxHeight = null;
    } else {
      console.log(content.scrollHeight);
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };

  return (
    <nav className={`navbar ${isOpen && "navbar-open"}`}>
      <ul className="navbar-nav">
        <li className="logo" onClick={() => setIsOpen(!isOpen)}>
          <a href="#" className="nav-link">
            <span className="link-text">Noise Generator</span>
            <HiChevronDoubleRight />
          </a>
        </li>

        <NoiseTypeSettings
          collapse={collapse}
          handleNoiseTypeChange={handleNoiseTypeChange}
          handleDimensionChange={handleDimensionChange}
        />
        <OffsetAndScaleSettings
          collapse={collapse}
          setFrequency={setFrequency}
          setOffsetX={setOffsetX}
          setOffsetY={setOffsetY}
        />
        <FractalSettings
          collapse={collapse}
          octaves={octaves}
          setOctaves={setOctaves}
          lacunarity={lacunarity}
          setLacunarity={setLacunarity}
          persistance={persistance}
          setPersistance={setPersistance}
        />

        <li className="nav-item">
          <a href="#" className="nav-link">
            <FiSettings />
            <span className="link-text">Download</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
