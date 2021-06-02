import { useRef, useState } from "react";
import { BsGraphDown } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";

// TODO: Make settings components more reusable

type Props = {
  collapse: (content: HTMLDivElement) => void;
  octaves: number;
  setOctaves: (n: number) => void;
  lacunarity: number;
  setLacunarity: (n: number) => void;
  persistance: number;
  setPersistance: (n: number) => void;
  openSidebar: (open: boolean) => void;
};

const FractalSettings = ({
  collapse,
  octaves,
  setOctaves,
  lacunarity,
  setLacunarity,
  persistance,
  setPersistance,
  openSidebar,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a
        href="#"
        className="nav-link"
        onClick={() => {
          collapse(contentRef.current!);
          setOpen(!open);
          openSidebar(true);
        }}
      >
        <BsGraphDown className="nav-link-icon" />
        <span className="link-text">Fractal Settings</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </a>
      <div ref={contentRef} className={`settings-panel`}>
        <div className="input-container">
          <label htmlFor="octaves" className="slider-label">
            Octaves: {octaves}
          </label>
          <input
            type="range"
            min={1}
            max={8}
            value={octaves}
            onChange={(e) => setOctaves(parseInt(e.target.value))}
            className="slider"
          />
        </div>
        <div className="input-container">
          <label htmlFor="lacunarity" className="slider-label">
            Lacunarity: {lacunarity}
          </label>
          <input
            type="range"
            min={1.0}
            max={4.0}
            step="0.01"
            value={lacunarity}
            onChange={(e) => setLacunarity(parseFloat(e.target.value))}
            className="slider"
          />
        </div>
        <div className="input-container">
          <label htmlFor="persistance" className="slider-label">
            Persistance: {persistance}
          </label>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step="0.001"
            value={persistance}
            onChange={(e) => setPersistance(parseFloat(e.target.value))}
            className="slider"
          />
        </div>
        <div className="underline"></div>
      </div>
    </li>
  );
};

export default FractalSettings;
