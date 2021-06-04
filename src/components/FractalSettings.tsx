import { useEffect, useState } from "react";
import { BsGraphDown } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useGlobalContext } from "../context";
import Collapsible from "./Collapsible";

// TODO: Make settings components more reusable

type Props = {
  openSidebar: (open: boolean) => void;
  isSidebarOpen: boolean;
};

const FractalSettings = ({ openSidebar, isSidebarOpen }: Props) => {
  const [open, setOpen] = useState(false);

  const { octaves, setOctaves, lacunarity, setLacunarity, persistance, setPersistance } =
    useGlobalContext();

  // collapse dropdown when sidebar closes
  useEffect(() => {
    if (open && !isSidebarOpen) {
      setOpen(false);
    }
  }, [isSidebarOpen, open]);

  return (
    <li className="nav-item">
      <button
        className="nav-link"
        onClick={() => {
          setOpen(!open);
          openSidebar(true);
        }}
      >
        <BsGraphDown className="nav-link-icon" />
        <span className="link-text">Fractal Settings</span>
        <RiArrowDropDownFill className={`link-dropdown ${open && "open"}`} />
      </button>
      <Collapsible open={open} setOpen={setOpen}>
        <div className="input-container">
          <label htmlFor="octaves" className="label">
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
          <label htmlFor="lacunarity" className="label">
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
          <label htmlFor="persistance" className="label">
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
      </Collapsible>
    </li>
  );
};

export default FractalSettings;
