import { useRef } from "react";
import { FiSettings } from "react-icons/fi";

type Props = {
  collapse: (content: HTMLDivElement) => void;
  octaves: number;
  setOctaves: (n: number) => void;
  lacunarity: number;
  setLacunarity: (n: number) => void;
  persistance: number;
  setPersistance: (n: number) => void;
};

const FractalSettings = ({
  collapse,
  octaves,
  setOctaves,
  lacunarity,
  setLacunarity,
  persistance,
  setPersistance,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li className="nav-item">
      <a href="#" className="nav-link" onClick={() => collapse(contentRef.current!)}>
        <FiSettings />
        <span className="link-text">Fractal Settings</span>
      </a>
      <div ref={contentRef} className={`settings-panel`}>
        <div>
          <label htmlFor="octaves">Octaves</label>
          <input
            type="range"
            min={1}
            max={8}
            value={octaves}
            onChange={(e) => setOctaves(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="lacunarity">Lacunarity</label>
          <input
            type="range"
            min={1.0}
            max={4.0}
            step="0.01"
            value={lacunarity}
            onChange={(e) => setLacunarity(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="persistance">Persistance</label>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step="0.001"
            value={persistance}
            onChange={(e) => setPersistance(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </li>
  );
};

export default FractalSettings;
