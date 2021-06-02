import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { HiChevronDoubleRight } from "react-icons/hi";
import NoiseTypeSettings from "./NoiseTypeSettings";
import OffsetAndScaleSettings from "./OffsetAndScaleSettings";
import FractalSettings from "./FractalSettings";
import GradientSettings from "./GradientSettings";

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
  palette: { offset: string; color: string }[];
  setPalette: React.Dispatch<
    React.SetStateAction<
      {
        offset: string;
        color: string;
      }[]
    >
  >;
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
  palette,
  setPalette,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: collapse all opened settings when closing sidebar
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
        {/* TODO: Style logo */}
        <li className="logo" onClick={() => setIsOpen(!isOpen)}>
          <a href="#" className="nav-link">
            <span className="link-text">Noise Generator</span>
            <HiChevronDoubleRight className="nav-link-icon" />
          </a>
        </li>

        <NoiseTypeSettings
          collapse={collapse}
          handleNoiseTypeChange={handleNoiseTypeChange}
          handleDimensionChange={handleDimensionChange}
          openSidebar={setIsOpen}
        />
        <OffsetAndScaleSettings
          collapse={collapse}
          setFrequency={setFrequency}
          setOffsetX={setOffsetX}
          setOffsetY={setOffsetY}
          openSidebar={setIsOpen}
        />
        <FractalSettings
          collapse={collapse}
          octaves={octaves}
          setOctaves={setOctaves}
          lacunarity={lacunarity}
          setLacunarity={setLacunarity}
          persistance={persistance}
          setPersistance={setPersistance}
          openSidebar={setIsOpen}
        />

        <GradientSettings
          collapse={collapse}
          palette={palette}
          setPalette={setPalette}
          openSidebar={setIsOpen}
        />

        {/* TODO: Style download button */}
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FiSettings className="nav-link-icon" />
            <span className="link-text">Download</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
